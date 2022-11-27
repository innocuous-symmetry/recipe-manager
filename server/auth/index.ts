import { IUser, IUserAuth } from "../schemas";
import { User } from "../models/user";
import { Collection } from "../models/collection";
import createError from "http-errors";
import bcrypt from "bcrypt";
import now from "../util/now";

const UserInstance = new User();
const CollectionInstance = new Collection();
export default class AuthService {
    // methods for local strategies
    async register(data: IUser) {
        const { email, password } = data;

        data.datecreated = now;
        data.datemodified = now;
        data.active = true;
        data.isadmin = false;

        try {
            const user = await UserInstance.getOneByEmail(email);
            if (user) throw createError('409', 'Email already in use');

            // hash password and create new user record
            return bcrypt.genSalt(10, (err, salt) => {
                if (err) throw err;
                bcrypt.hash(password!, salt, async (err, hash) => {
                    if (err) throw err;
                    const newData = {
                        ...data,
                        password: hash
                    }
                    
                    const result: IUser = await UserInstance.post(newData);

                    // basic profile setup
                    await CollectionInstance.post({
                        name: `${data.firstname}'s Collection`,
                        active: true,
                        ismaincollection: true,
                        ownerid: result.id!.toString(),
                        datecreated: now,
                        datemodified: now
                    });

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