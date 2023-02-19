import { IRecipe, RecipeIngredient } from "../schemas";
import { Recipe } from "../models/recipe";
import ControllerResponse from "../util/ControllerResponse";
import { StatusCode } from "../util/types";
const RecipeInstance = new Recipe();

export default class RecipeCtl {
    async getOne(id: number) {
        try {
            const result = await RecipeInstance.getOneByID(id);
            const ok = result !== null;
            const code = ok ? StatusCode.OK : StatusCode.NotFound;
            return new ControllerResponse(code, (result || "No recipe found with this ID"));
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async getAllAuthored(id: number) {
        try {
            const result = await RecipeInstance.getAllAuthored(id);
            const ok = result !== null;
            const code = ok ? StatusCode.OK : StatusCode.NotFound;
            return new ControllerResponse(code, (result || "No recipes found for this user"));
        } catch (e: any) {
            throw new Error(e);
        }
    }

    async getAllAccessible(id: number) {
        try {
            const result = await RecipeInstance.getAllAccessible(id);
            const code = result !== null ? StatusCode.OK : StatusCode.NotFound;
            return new ControllerResponse(code, (result || "No recipes currently accessible"));
        } catch (e: any) {
            throw new Error(e);
        }
    }

    async updateOne(id: number, data: IRecipe) {
        try {
            const result = await RecipeInstance.updateOneByID(id, data);
            const ok = result !== null;
            const code = ok ? StatusCode.OK : StatusCode.BadRequest;
            return new ControllerResponse(code, (result || "Something went wrong"));
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async post(userid: number, data: IRecipe) {
        try {
            const result = await RecipeInstance.post(userid, data);
            const ok = result !== null;
            const code = ok ? StatusCode.NewContent : StatusCode.BadRequest;
            return new ControllerResponse(code, (result || "Something went wrong"));
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async addIngredientToRecipe(ingredient: RecipeIngredient, recipeid: string | number) {
        try {
            const result = await RecipeInstance.addIngredientToRecipe(ingredient, recipeid);
            const ok = result !== null;
            const code = ok ? StatusCode.NewContent : StatusCode.BadRequest;
            return new ControllerResponse(code, (result || "Something went wrong"));
        } catch (error: any) {
            throw new Error(error);
        }
    }
}