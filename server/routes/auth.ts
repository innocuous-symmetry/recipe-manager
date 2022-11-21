import { Express, Router } from "express"
import { PassportStatic } from "passport";
import { IUser, IUserAuth } from "../schemas";
import AuthService from "../auth";
import { UserCtl } from "../controllers";
import now from "../util/now";
const AuthInstance = new AuthService();
const UserControl = new UserCtl();

const router = Router();

export const authRoute = (app: Express, passport: PassportStatic) => {
    app.use('/auth', router);

    router.get('/', (req, res) => {
        const data = {
            session: req.session,
            user: req.user
        }
        res.send(JSON.stringify(data));
    })

    router.post('/login', passport.authenticate('local'), async (req, res, next) => {
        try {
            const data: IUserAuth = req.body;
            const response = await AuthInstance.login(data);
            console.log(response);

            if (response.ok) {
                req.user = response.user;
                await UserControl.updateOne(response.user.id, { ...response.user, datemodified: now })
                res.cookie('userid', response.user.id, { maxAge: 1000 * 60 * 60 * 24 * 7 });
                res.status(200).send(response.user);
            } else {
                res.status(401).send({ message: "Login unsuccessful" });
            }
        } catch(e) {
            next(e);
        }
    })

    router.post('/logout', passport.authenticate('local', async (req, res, next) => {
        try {
            if (req.session) req.session.destroy();
            res.sendStatus(200);
        } catch(e) {
            next(e);
        }
    }));

    router.post('/register', async (req, res, next) => {
        try {
            const data: IUser = req.body;
            const now = new Intl.DateTimeFormat('en-US', {})

            const response = await AuthInstance.register(data);
            res.status(200).send(response);
        } catch(e) {
            next(e);
        }
    })
}