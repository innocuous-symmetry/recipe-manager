import createError from "http-errors";
import { IRecipe } from "../schemas";
import { Recipe } from "../models/recipe";
const RecipeInstance = new Recipe();

export default class RecipeCtl {
    async getOne(id: string) {
        try {
            const result = await RecipeInstance.getOneByID(id);
            if (!result) throw createError('404', "Recipe not found");
            return result;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async updateOne(id: string, data: IRecipe) {
        try {
            const result = await RecipeInstance.updateOneByID(id, data);
            if (!result) throw createError('400', "Bad request");
            return result;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async post(data: IRecipe) {
        try {
            const result = await RecipeInstance.post(data);
            if (!result) throw createError('400', "Bad request");
            return result;
        } catch (error: any) {
            throw new Error(error);
        }
    }
}