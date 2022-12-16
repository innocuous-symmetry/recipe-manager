import { IUser } from '../schemas';
import { User } from "../models/user";
import ControllerResponse from '../util/ControllerResponse';
import { StatusCode } from '../util/types';
const UserInstance = new User();

export default class UserCtl {
    async getAll() {
        try {
            // attempt to get users from database
            const users: IUser[] | null = await UserInstance.getAllUsers();

            // construct controller response
            const ok: boolean = users !== null;
            const code: StatusCode = ok ? StatusCode.OK : StatusCode.NotFound;
            const data: IUser[] | string = ok ? users! : "No users found.";
            
            // send formatted response with either data or informative error message
            return new ControllerResponse<IUser[] | string>(ok, code, data)
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async post(body: IUser) {
        try {
            const response = await UserInstance.post(body);
            const ok = response !== null;
            const code = ok ? StatusCode.NewContent : StatusCode.BadRequest
            const data = ok ? response : "Bad request"
            return new ControllerResponse(ok, code, data);
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async getOne(id: number | string) {
        try {
            const user = await UserInstance.getOneByID(id);
            const ok = user !== null;
            const code = ok ? StatusCode.OK : StatusCode.NotFound;
            const data = ok ? user : "User by this ID not found";
            return new ControllerResponse(ok, code, data);
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async updateOne(id: number | string, body: IUser) {
        try {
            const result = await UserInstance.updateOneByID(id, body);
            const ok = result !== null;
            const code = ok ? StatusCode.OK : StatusCode.BadRequest;
            const data = ok ? result : "Update unsuccessful"
            return new ControllerResponse(ok, code, data);
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async getFriends(id: number | string) {
        try {
            const result = await UserInstance.getFriends(id);
            const ok = result !== null
            const code = ok ? StatusCode.OK : StatusCode.NotFound;
            const data = ok ? result : "No friends found"
            return new ControllerResponse(ok, code, data);
        } catch (e: any) {
            throw new Error(e);
        }
    }

    async getFriendshipByID(id: number | string, userid: number | string) {
        try {
            const { ok, code, result } = await UserInstance.getFriendshipByID(id, userid);
            return new ControllerResponse(ok, code, result);
        } catch (e: any) {
            throw new Error(e);
        }
    }

    async getPendingFriendRequests(senderid: string | number) {
        try {
            const { ok, code, result } = await UserInstance.getPendingFriendRequests(senderid);
            return new ControllerResponse(ok, code, result);
        } catch (e: any) {
            throw new Error(e);
        }
    }

    async addFriendship(userid: number | string, targetid: number | string) {
        try {
            const result = await UserInstance.addFriendship(userid, targetid);
            const ok = result !== null;
            const code = ok ? StatusCode.NewContent : StatusCode.BadRequest;
            const data = ok ? result : "Something went wrong"
            return new ControllerResponse(ok, code, data);
        } catch (e: any) {
            throw new Error(e);
        }
    }

    async updateFriendship(id: number | string, userid: number | string, data: { active: boolean, pending: boolean, dateterminated?: string }) {
        try {
            const { ok, code, result } = await UserInstance.updateFriendship(id, userid, data);
            return new ControllerResponse(ok, code, result);
        } catch (e: any) {
            throw new Error(e);
        }
    }
}