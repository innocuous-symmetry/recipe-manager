import createError from "http-errors";
import { IGroceryList } from "../schemas";
import { GroceryList } from "../models/groceryList";
import { StatusCode } from "../util/types";
import ControllerResponse from "../util/ControllerResponse";
const GroceryInstance = new GroceryList();

export default class GroceryListCtl {
    async getAll() {
        try {
            const result = await GroceryInstance.getAll();
            const code = (result !== null) ? StatusCode.OK : StatusCode.NotFound;
            return new ControllerResponse(code, (result || "No grocery list data found"));
        } catch (e: any) {
            throw new Error(e);
        }
    }

    async getOne(id: string) {
        try {
            const result = await GroceryInstance.getOne(id);
            const code = (result !== null) ? StatusCode.OK : StatusCode.NotFound;
            return new ControllerResponse(code, (result || "No grocery list data found with this ID"));
        } catch (e: any) {
            throw new Error(e);
        }
    }

    async getByUserID(userid: string) {
        try {
            const result = await GroceryInstance.getByUserID(userid);
            const code = (result !== null) ? StatusCode.OK : StatusCode.NotFound;
            return new ControllerResponse(code, (result || "No grocery list data found matching this user ID"));
        } catch (e: any) {
            throw new Error(e);
        }
    }

    async post(data: IGroceryList) {
        try {
            const result = await GroceryInstance.post(data);
            const code = (result !== null) ? StatusCode.NewContent : StatusCode.BadRequest;
            return new ControllerResponse(code, (result || "Something went wrong"));
        } catch (e: any) {
            throw new Error(e);
        }
    }

    async put(id: string, data: IGroceryList) {
        try {
            const result = await GroceryInstance.put(id, data);
            const code = (result !== null) ? StatusCode.OK : StatusCode.BadRequest;
            return new ControllerResponse(code, (result || "Something went wrong"));
        } catch (e: any) {
            throw new Error(e);
        }
    }
}