import { Express, Request, Router } from "express"
import { PassportStatic } from "passport";
import { IUser, IUserAuth } from "../schemas";
import AuthService from "../auth";
import { UserCtl } from "../controllers";
import now from "../util/now";
import { restrictAccess } from "../auth/middlewares";
import { Session } from "express-session";
const AuthInstance = new AuthService();
const UserControl = new UserCtl();

const router = Router();

export const authRoute = (app: Express, passport: PassportStatic) => {
    app.use('/auth', router);

    router.get('/', restrictAccess, (req, res, next) => {
        if (!req.user) res.send({ user: undefined });

        // @ts-ignore: does not recognize structure of req.user
        const { user } = req.user;
        const userData = {
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            handle: user.handle,
            email: user.email
        }
        res.send({ user: userData });
    })

    router.get('/protected', restrictAccess, (req, res, next) => {
        res.status(200).send({ message: "Cool restricted content!" });
    })

    router.post('/login', passport.authenticate('local'), async (req, res, next) => {
        try {
            const data: IUserAuth = req.body;
            const response = await AuthInstance.login(data);

            if (response.ok) {
                req.logIn(response.user, (error: any) => {
                    if (error) throw error;
                    console.log('login successful');
                })
                
                res.cookie('userid', response.user.id, { maxAge: 1000 * 60 * 60 * 24 });
                res.send(response);
                res.end();
            } else {
                res.status(401).send({ message: "Login unsuccessful" });
            }
        } catch(e) {
            next(e);
        }
    })

    router.post('/register', async (req, res, next) => {
        try {
            const data: IUser = req.body;
            const response = await AuthInstance.register(data);
            if (!response) res.status(400).send({ ok: false });
            res.status(200).send({ ok: true });
        } catch(e) {
            next(e);
        }
    })

    router.delete('/logout', async (req, res, next) => {
        try {
            req.session.destroy((err) => {
                if (err) throw err;
            })
            res.clearCookie('userid');
            res.status(204).send({ ok: true });
        } catch(e) {
            next(e);
        }
    });
}