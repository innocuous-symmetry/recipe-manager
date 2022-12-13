import { IRecipe } from "../schemas";
import { Recipe } from "../models/recipe";
import ControllerResponse from "../util/ControllerResponse";
const RecipeInstance = new Recipe();

export default class RecipeCtl {
    async getOne(id: string) {
        try {
            const result = await RecipeInstance.getOneByID(id);
            const ok = result !== null;
            return new ControllerResponse(ok, (ok ? 200 : 404), (ok ? result : "No recipe found with this ID"));
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async getAllAuthored(id: string) {
        try {
            const result = await RecipeInstance.getAllAuthored(id);
            const ok = result !== null;
            return new ControllerResponse(ok, (ok ? 200 : 404), (ok ? result : "No recipes found authored by user with this ID"));
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
            const ok = result !== null;
            return new ControllerResponse(ok, (ok ? 200 : 400), (ok ? result : "Something went wrong"));
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async post(userid: string, data: IRecipe) {
        try {
            const result = await RecipeInstance.post(userid, data);
            const ok = result !== null;
            return new ControllerResponse(ok, (ok ? 201 : 400), (ok ? result : "Something went wrong"));
        } catch (error: any) {
            throw new Error(error);
        }
    }
}