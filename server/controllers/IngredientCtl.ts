import { IIngredient } from "../schemas";
import { Ingredient } from "../models/ingredient";
import ControllerResponse from "../util/ControllerResponse";
import { StatusCode } from "../util/types";
const IngredientInstance = new Ingredient();

export default class IngredientCtl {
    async getAll() {
        try {
            const result = await IngredientInstance.getAll();
            const ok = result !== null;
            const code = ok ? StatusCode.OK : StatusCode.NotFound;
            return new ControllerResponse(code, (result || "No ingredients found"));
        } catch (e: any) {
            throw new Error(e);
        }
    }

    async getAllForRecipe(recipeid: string) {
        try {
            const result = await IngredientInstance.getAllForRecipe(recipeid);
            const ok = result !== null;
            const code = ok ? StatusCode.OK : StatusCode.NotFound;
            return new ControllerResponse(code, (result || "No ingredient found with this recipe ID"));
        } catch (e: any) {
            throw new Error(e);
        }
    }

    async getOne(id: string) {
        try {
            const result = await IngredientInstance.getOne(id);
            const ok = result !== null;
            const code = ok ? StatusCode.OK : StatusCode.NotFound;
            return new ControllerResponse(code, (result || "No ingredient found with this ID"));
        } catch (e: any) {
            throw new Error(e);
        }
    }

    async post(data: IIngredient) {
        try {
            const result = await IngredientInstance.post(data);
            const ok = result !== null;
            const code = ok ? StatusCode.NewContent : StatusCode.BadRequest;
            return new ControllerResponse(code, (result || "Something went wrong"));
        } catch (e: any) {
            throw new Error(e);
        }
    }

    async put(id: string, data: IIngredient) {
        try {
            const result = await IngredientInstance.put(id, data);
            const ok = result !== null;
            const code = ok ? StatusCode.OK : StatusCode.BadRequest;
            return new ControllerResponse(code, (result || "Something went wrong"));
        } catch (e: any) {
            throw new Error(e);
        }
    }
}