import createError from "http-errors";
import { IGroceryList } from "../schemas";
import { GroceryList } from "../models/groceryList";
const GroceryInstance = new GroceryList();

export default class GroceryListCtl {
    async getAll() {
        try {
            const result = await GroceryInstance.getAll();
            if (!result) throw createError('404', 'No results found');
            return result;
        } catch (e: any) {
            throw new Error(e);
        }
    }

    async getOne(id: string) {
        try {
            const result = await GroceryInstance.getOne(id);
            if (!result) throw createError('404', 'No results found');
            return result;
        } catch (e: any) {
            throw new Error(e);
        }
    }

    async getByUserID(userid: string) {
        try {
            const result = await GroceryInstance.getByUserID(userid);
            if (!result) throw createError('404', 'No results found');
            return result;
        } catch (e: any) {
            throw new Error(e);
        }
    }

    async post(data: IGroceryList) {
        try {
            const result = await GroceryInstance.post(data);
            if (!result) throw createError('400', 'Bad request');
            return result;
        } catch (e: any) {
            throw new Error(e);
        }
    }

    async put(id: string, data: IGroceryList) {
        try {
            const result = await GroceryInstance.put(id, data);
            if (!result) throw createError('400', 'Bad request');
            return result;
        } catch (e: any) {
            throw new Error(e);
        }
    }
}