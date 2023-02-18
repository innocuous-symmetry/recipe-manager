import { IUser } from '../schemas';
import { User } from "../models/user";
import ControllerResponse from '../util/ControllerResponse';
import { StatusCode } from '../util/types';
const UserInstance = new User();

export default class UserCtl {
    /* * * * * * * * * * * * * * * * * * * * * * * * * * *
     * FIRST SECTION:
     * METHODS SPECIFIC TO USERS AND USER DATA
    * * * * * * * * * * * * * * * * * * * * * * * * * * */

    /**
     * ### @method getAll
     * returns all available user entries
     * 
     * @params (none)
     * @returns list of users, or an explanatory string if no response is received
     */
    async getAll() {
        try {
            // attempt to get users from database
            const users: IUser[] | null = await UserInstance.getAllUsers();

            // construct controller response
            const ok: boolean = users !== null;
            const code: StatusCode = ok ? StatusCode.OK : StatusCode.NotFound;
            const data: IUser[] | string = ok ? users! : "No users found.";
            
            // send formatted response with either data or informative error message
            return new ControllerResponse<IUser[] | string>(code, data, ok)
        } catch (error: any) {
            throw new Error(error);
        }
    }

    /**
     * ### @method post
     * @param body - serialized user data as { IUser }
     * @returns the newly inserted user entry, or an explanatory string
     */
    async post(body: IUser) {
        try {
            const response = await UserInstance.post(body);
            const ok = response !== null;
            const code = ok ? StatusCode.NewContent : StatusCode.BadRequest
            const data = ok ? response : "Bad request"
            return new ControllerResponse(code, data);
        } catch (error: any) {
            throw new Error(error);
        }
    }

    /**
     * ### @method getOne
     * @param id - user id to query
     * @returns the user entry, if found, or an explanatory string if none was found
     */
    async getOne(id: number | string) {
        try {
            const user = await UserInstance.getOneByID(id);
            const ok = user !== null;
            const code = ok ? StatusCode.OK : StatusCode.NotFound;
            const data = ok ? user : "User by this ID not found";
            return new ControllerResponse(code, data);
        } catch (error: any) {
            throw new Error(error);
        }
    }

    /**
     * ### @method updateOne
     * @param id - user id to update
     * @param body - the new user body to update with
     * @returns the updated user body, or an explanatory string
     */
    async updateOne(id: number | string, body: IUser) {
        try {
            const result = await UserInstance.updateOneByID(id, body);
            const ok = result !== null;
            const code = ok ? StatusCode.OK : StatusCode.BadRequest;
            const data = ok ? result : "Update unsuccessful"
            return new ControllerResponse(code, data);
        } catch (error: any) {
            throw new Error(error);
        }
    }

    /* * * * * * * * * * * * * * * * * * * * * * * * * * *
     * SECOND SECTION:
     * METHODS SPECIFIC TO FRIENDSHIPS BETWEEN USERS
    * * * * * * * * * * * * * * * * * * * * * * * * * * */

    /**
     * ### @method getFriends
     * @param id - get all friendship entries for a user, regardless of status
     * @returns a list of friendship entries, or an explanatory string if none are found
     */
    async getFriends(id: number | string) {
        try {
            const result = await UserInstance.getFriends(id);
            const ok = result !== null
            const code = ok ? StatusCode.OK : StatusCode.NotFound;
            const data = ok ? result : "No friends found"
            return new ControllerResponse(code, data);
        } catch (e: any) {
            throw new Error(e);
        }
    }

    /**
     * ### @method getFriendshipByID
     * @param id - the ID of the friendship in question
     * @param userid - the user ID of the logged in user, to verify permissions 
     * @returns a friendship entry, or an explanatory string
     */
    async getFriendshipByID(id: number | string, userid: number | string) {
        try {
            const { ok, code, result } = await UserInstance.getFriendshipByID(id, userid);
            return new ControllerResponse(code, result);
        } catch (e: any) {
            throw new Error(e);
        }
    }

    /**
     * ### @method getPendingFriendRequests
     * 
     * *IMPORTANT*: I don't think this one works the way I think it does
     */
    async getPendingFriendRequests(recipient: string | number) {
        try {
            const { ok, code, result } = await UserInstance.getPendingFriendRequests(recipient);
            return new ControllerResponse(code, result);
        } catch (e: any) {
            throw new Error(e);
        }
    }

    async getAcceptedFriends(userid: number | string) {
        try {
            const { code, result } = await UserInstance.getAcceptedFriends(userid);
            return new ControllerResponse(code, result);
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
            return new ControllerResponse(code, data);
        } catch (e: any) {
            throw new Error(e);
        }
    }

    async updateFriendship(id: number | string, userid: number | string, data: { active: boolean, pending: boolean, dateterminated?: string }) {
        try {
            const { code, result } = await UserInstance.updateFriendship(id, userid, data);
            return new ControllerResponse(code, result);
        } catch (e: any) {
            throw new Error(e);
        }
    }
}