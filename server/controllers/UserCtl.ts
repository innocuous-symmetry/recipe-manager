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

    async getOne(id: number | string) {
        try {
            const user = await UserInstance.getOneByID(id);
            if (!user) throw createError(404, "User not found");
            return user;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async updateOne(id: number | string, data: IUser) {
        try {
            const result = await UserInstance.updateOneByID(id, data);
            if (!result) throw createError(400, "Bad request");
            return result;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async getFriends(id: number | string) {
        try {
            const result = await UserInstance.getFriends(id);
            if (!result) return createError(404, "You have no friends");
            return result;
        } catch (e: any) {
            throw new Error(e);
        }
    }

    async getFriendshipByID(id: number | string, userid: number | string) {
        try {
            const { ok, code, result } = await UserInstance.getFriendshipByID(id, userid);
            if (ok) return result;
            throw createError(code, result);
        } catch (e: any) {
            throw new Error(e);
        }
    }

    async getPendingFriendRequests(senderid: string | number) {
        try {
            const { ok, code, result } = await UserInstance.getPendingFriendRequests(senderid);
            if (ok) return result;
            throw createError(code, result);
        } catch (e: any) {
            throw new Error(e);
        }
    }

    async addFriendship(userid: number | string, targetid: number | string) {
        try {
            const result = await UserInstance.addFriendship(userid, targetid);
            if (!result) throw createError(400, "something went wrong");
            return result;
        } catch (e: any) {
            throw new Error(e);
        }
    }

    async updateFriendship(id: number | string, userid: number | string, data: { active: boolean, pending: boolean, dateterminated?: string }) {
        try {
            const { ok, code, result } = await UserInstance.updateFriendship(id, userid, data);
            if (ok) return result;
            throw createError(code, result);
        } catch (e: any) {
            throw new Error(e);
        }
    }
}