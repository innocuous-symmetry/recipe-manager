import createError from "http-errors";
import { IIngredient } from "../schemas";
import { Ingredient } from "../models/ingredient";
const IngredientInstance = new Ingredient();

export default class IngredientCtl {
    async getAll() {
        try {
            const result = await IngredientInstance.getAll();
            if (!result) throw createError('404', 'No ingredients found');
            return result;
        } catch (e: any) {
            throw new Error(e);
        }
    }

    async getOne(id: string) {
        try {
            const result = await IngredientInstance.getOne(id);
            if (!result) throw createError('404', 'No ingredient found with id ' + id);
            return result;
        } catch (e: any) {
            throw new Error(e);
        }
    }

    async post(data: IIngredient) {
        try {
            const result = await IngredientInstance.post(data);
            if (!result) throw createError('400', 'Bad request');
            return result;
        } catch (e: any) {
            throw new Error(e);
        }
    }

    async put(id: string, data: IIngredient) {
        try {
            const result = await IngredientInstance.put(id, data);
            if (!result) throw createError('400', 'Bad request');
            return result;
        } catch (e: any) {
            throw new Error(e);
        }
    }
}