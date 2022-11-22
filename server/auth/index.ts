import { IUser, IUserAuth } from "../schemas";
import { User } from "../models/user";
import createError from "http-errors";
import bcrypt from "bcrypt";
import now from "../util/now";

const UserInstance = new User();

export default class AuthService {
    // methods for local strategies
    async register(data: IUser) {
        const { email, password } = data;

        data.datecreated = now;
        data.datemodified = now;
        data.active = true;

        try {
            const user = await UserInstance.getOneByEmail(email);
            if (user) throw createError('409', 'Email already in use');
            
            bcrypt.genSalt(10, (err, salt) => {
                if (err) throw err;
                bcrypt.hash(password, salt, async (err, hash) => {
                    if (err) throw err;
                    const newData = {
                        ...data,
                        password: hash
                    }
                    
                    const result = await UserInstance.post(newData);
                    if (result) console.log(result);
                    return result;
                })
            })
        } catch (e: any) {
            throw new Error(e);
        }

    }

    async login(data: IUserAuth) {
        const { email, password } = data;

        try {
            const user = await UserInstance.getOneByEmail(email);
            if (!user) return { ok: false, user: null }
            const match = await bcrypt.compare(password, user.password);
            console.log(match);
            return {
                ok: match,
                user: match ? user : null
            }
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