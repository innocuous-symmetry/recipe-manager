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
            let receivedUser: IUser | undefined;

            // not allowed to use email address that already exists
            const user = await UserInstance.getOneByEmail(email);
            if (user) throw createError('409', 'Email already in use');

            // hash password and create new user record
            const salt = await bcrypt.genSalt();
            bcrypt.hash(password!, salt, async (err, hash) => {
                if (err) throw err;
                const newData = {
                    ...data,
                    password: hash
                }

                const res: IUser | null = await UserInstance.post(newData);
                if (res) receivedUser = res;

                // basic profile setup
                res && await CollectionInstance.post({
                    name: `${data.firstname}'s Collection`,
                    active: true,
                    ismaincollection: true,
                    ownerid: res.id!.toString(),
                    datecreated: now,
                    datemodified: now
                });
            })

            return true;
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