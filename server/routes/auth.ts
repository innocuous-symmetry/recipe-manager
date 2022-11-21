import { Express, Router } from "express"
import { PassportStatic } from "passport";
import { IUser, IUserAuth } from "../schemas";
import AuthService from "../auth";
const AuthInstance = new AuthService();

const router = Router();

export const authRoute = (app: Express, passport: PassportStatic) => {
    app.use('/auth', router);

    router.post('/login', passport.authenticate('local'), async (req, res, next) => {
        try {
            const data: IUserAuth = req.body;
            console.log(data);
            const response = await AuthInstance.login(data);
            res.status(200).send(response);
        } catch(e) {
            next(e);
        }
    })

    router.post('/register', async (req, res, next) => {
        try {
            const data: IUser = req.body;
            const response = await AuthInstance.register(data);
            res.status(200).send(response);
        } catch(e) {
            next(e);
        }
    })
}