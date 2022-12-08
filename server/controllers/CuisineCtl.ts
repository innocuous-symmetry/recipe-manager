import createError from "http-errors";
import { ICuisine } from "../schemas";
import Cuisine from "../models/cuisine";
const CuisineInstance = new Cuisine();

export default class CuisineCtl {
    async getAll() {
        try {
            const result = await CuisineInstance.getAll();
            if (!result) throw createError('404', 'No cuisines found');
            return result;
        } catch (e: any) {
            throw new Error(e);
        }
    }

    async getOne(id: string) {
        try {
            const result = await CuisineInstance.getOne(id);
            if (!result) throw createError('404', 'No cuisine found with id ' + id);
            return result;
        } catch (e: any) {
            throw new Error(e);
        }
    }

    async post(data: ICuisine) {
        try {
            const result = await CuisineInstance.post(data);
            if (!result) throw createError('400', 'Bad request');
            return result;
        } catch (e: any) {
            throw new Error(e);
        }
    }
}