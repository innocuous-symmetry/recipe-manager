import { Express, Router } from "express"
import { PassportStatic } from "passport";
import jwt from "jsonwebtoken";
import { IUser, IUserAuth } from "../schemas";
import AuthService from "../auth";
import { UserCtl } from "../controllers";
import now from "../util/now";
import { restrictAccess } from "../auth/middlewares";
import { Session } from "express-session";
import ControllerResponse from "../util/ControllerResponse";
const AuthInstance = new AuthService();
const UserInstance = new UserCtl();

const router = Router();

export const authRoute = (app: Express) => {
    app.use('/auth', router);

    router.use((req, res, next) => {
        console.log(req.session);
        next();
    })

    router.get('/', restrictAccess, (req, res, next) => {
        if (req.session.user) {
            const user = req.session.user;
            const userData = {
                id: user.id,
                firstname: user.firstname,
                lastname: user.lastname,
                handle: user.handle,
                email: user.email
            }
            res.send({ user: userData });
        } else {
            res.send({ user: undefined })
        }
    })

    router.get('/protected', restrictAccess, (req, res, next) => {
        res.status(200).send({ message: "Cool restricted content!" });
    })

    router.post('/login', async (req, res, next) => {
        try {
            const data: IUserAuth = req.body;
            console.log(data);

            const response: ControllerResponse<any> = await AuthInstance.login(data);

            if (response.ok) {
                const user = response.data as IUser;

                req.user = user;
                req.session.user = user;

                const safeUserData = {
                    id: user.id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    handle: user.handle,
                    email: user.email,
                    datecreated: user.datecreated,
                    datemodified: user.datemodified
                }

                const token = jwt.sign({ user: safeUserData }, process.env.SESSIONSECRET as string);

                req.session.save((err) => {
                    return next(err);
                })

                console.log(req.session);

                res.cookie('token', token, { httpOnly: true });
                res.json({ token });
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
            response.represent();
            
            res.status(response.code).send({ ok: response.ok, message: response.data });
        } catch(e) {
            next(e);
        }
    })

    router.delete('/logout', async (req, res, next) => {
        try {
            res.clearCookie('connect.sid').clearCookie('token');
            res.status(204).send("logout successful");
            res.end();
        } catch(e) {
            next(e);
        }
    });
}