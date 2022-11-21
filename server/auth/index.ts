import { IUser, IUserAuth } from "../schemas";
import { User } from "../models/user";
import createError from "http-errors";
import bcrypt from "bcrypt";
import { QueryResult } from "pg";

const UserInstance = new User();

export default class AuthService {
    // methods for local strategies
    async register(data: IUser): Promise<Array<keyof IUser>> {
        const { email, password } = data;
        try {
            const user = await UserInstance.getOneByEmail(email);
            if (user) throw createError('409', 'Email already in use');

            let createdUser: IUser | null = null;
            
            bcrypt.genSalt((err, salt) => {
                if (err) throw err;
                bcrypt.hash(password, salt, (err, hash) => {
                    if (err) throw err;

                    createdUser = {
                        ...data,
                        password: hash
                    }
                })
            })

            if (!createdUser) throw createError('400', 'Error creating user');
            const result = await UserInstance.post(createdUser);
            if (!result) throw createError('400', 'Error creating user');
            return result;
        } catch (e: any) {
            throw new Error(e);
        }

    }

    async login(data: IUserAuth): Promise<Array<keyof IUser>> {
        return [];
    }

    // methods for Google OAuth
    async googleRegister() {

    }

    async googleLogin() {

    }
}