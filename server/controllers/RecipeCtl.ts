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

    async getAllAuthored(id: string) {
        try {
            const result = await RecipeInstance.getAllAuthored(id);
            if (!result) throw createError('404', "No recipes found");
            return result;
        } catch (e: any) {
            throw new Error(e);
        }
    }

    async getAllAccessible(id: string) {
        try {
            
        } catch (e: any) {
            throw new Error(e);
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

    async post(userid: string, data: IRecipe) {
        try {
            const result = await RecipeInstance.post(userid, data);
            if (!result) throw createError('400', "Bad request");
            return result;
        } catch (error: any) {
            throw new Error(error);
        }
    }
}