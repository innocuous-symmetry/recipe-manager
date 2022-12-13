import { IIngredient } from "../schemas";
import { Ingredient } from "../models/ingredient";
import ControllerResponse from "../util/ControllerResponse";
const IngredientInstance = new Ingredient();

export default class IngredientCtl {
    async getAll() {
        try {
            const result = await IngredientInstance.getAll();
            const ok = result !== null;
            return new ControllerResponse(ok, (ok ? 200 : 404), (ok ? result : "No recipes found"));
        } catch (e: any) {
            throw new Error(e);
        }
    }

    async getOne(id: string) {
        try {
            const result = await IngredientInstance.getOne(id);
            const ok = result !== null;
            return new ControllerResponse(ok, (ok ? 200 : 404), (ok ? result : "No recipe found with this ID"));
        } catch (e: any) {
            throw new Error(e);
        }
    }

    async post(data: IIngredient) {
        try {
            const result = await IngredientInstance.post(data);
            const ok = result !== null;
            return new ControllerResponse(ok, (ok ? 201 : 400), (ok ? result : "Something went wrong"));
        } catch (e: any) {
            throw new Error(e);
        }
    }

    async put(id: string, data: IIngredient) {
        try {
            const result = await IngredientInstance.put(id, data);
            const ok = result !== null;
            return new ControllerResponse(ok, (ok ? 200 : 400), (ok ? result : "Something went wrong"));
        } catch (e: any) {
            throw new Error(e);
        }
    }
}