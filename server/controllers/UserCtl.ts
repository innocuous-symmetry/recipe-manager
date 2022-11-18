import createError from 'http-errors';
import { IUser } from '../schemas';
import { User } from "../models/user";
const UserInstance = new User();

export default class UserCtl {
    async getAll() {
        try {
            const users = await UserInstance.getAllUsers();
            if (!users) throw createError(404, "No users found");
            return users;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async post(data: IUser) {
        try {
            const response = await UserInstance.post(data);
            // if (!response) throw createError(400, "Bad request");
            return response;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    // async getOne(id: string) {
    //     try {
    //         const user = await UserInstance.getOneByID(id);
    //         if (!user) throw createError(404, "User not found");
    //         return user;
    //     } catch (error) {
    //         throw new Error(error);
    //     }
    // }

    // async updateOne(id: string, data: IUser) {
    //     try {
    //         const result = await UserInstance.updateOneByID(id, data);
    //         if (!result) throw createError(400, "Bad request");
    //         return result;
    //     } catch (error) {
    //         throw new Error(error);
    //     }
    // }
}