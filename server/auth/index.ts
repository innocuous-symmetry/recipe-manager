import { IUser, IUserAuth } from "../schemas";
import { User } from "../models/user";
import createError from "http-errors";
import bcrypt from "bcrypt";
import now from "../util/now";
import ControllerResponse from "../util/ControllerResponse";
import { StatusCode } from "../util/types";

const UserInstance = new User();

export default class AuthService {
    // methods for local strategies
    async register(data: IUser) {
        data.datecreated = now;
        data.datemodified = now;
        data.active = true;
        data.isadmin = false;

        try {
            // not allowed to use email address that already exists
            const user = await UserInstance.getOneByEmail(data.email);

            if (user) throw createError('409', 'Email already in use');

            // hash password and create new user record
            const salt = await bcrypt.genSalt(12);
            console.log(salt);
            console.log(data.password);

            bcrypt.hash(data.password!, salt, (err, hash) => {
                if (err) throw err;
                const newData = {
                    ...data,
                    password: hash
                }

                UserInstance.post(newData);
            })

            return true;
        } catch (e: any) {
            throw new Error(e);
        }

    }

    async login(data: IUserAuth) {
        const { email, password } = data;

        try {
            const response: IUser = await UserInstance.getOneByEmail(email);
            const match = await bcrypt.compare(password, response.password!);
            const user = match ? response : null;
            const code = match ? StatusCode.OK : StatusCode.Forbidden;

            return new ControllerResponse(code, user, match);

        } catch (e: any) {
            throw new Error(e);
        }
    }

    // methods for Google OAuth
    async googleRegister() {

    }

    async googleLogin() {

    }
}