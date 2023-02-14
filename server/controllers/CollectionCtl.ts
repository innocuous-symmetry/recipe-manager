import createError from "http-errors";
import { ICollection } from "../schemas";
import { Collection } from "../models/collection";
import { StatusCode } from "../util/types";
import ControllerResponse from "../util/ControllerResponse";
const CollectionInstance = new Collection();

export default class CollectionCtl {
    async getOne(id: number | string) {
        const result = await CollectionInstance.getOne(id);

        const ok: boolean = result !== null;
        const code: StatusCode = ok ? StatusCode.OK : StatusCode.NotFound;
        const data: string | ICollection = result || "No collection found with this ID";
        return new ControllerResponse(code, data);
    }

    async getRecipesFromOne(id: number | string) {
        const result = await CollectionInstance.getRecipesFromOne(id);
        const ok: boolean = result !== null;
        const code: StatusCode = ok ? StatusCode.OK : StatusCode.NotFound;
        const data: string | ICollection[] = result || "No collection found with this ID";
        return new ControllerResponse(code, data);
    }

    async getAll() {
        const result = await CollectionInstance.getAll();
        const ok = result !== null;
        const code = ok ? StatusCode.OK : StatusCode.NotFound;
        const data = result || "No collections found"
        return new ControllerResponse(code, data);
    }

    async getAllAuthored(id: number | string) {
        const result = await CollectionInstance.getAllAuthored(id);
        const code = (result !== null) ? StatusCode.OK : StatusCode.NotFound;
        const data = result || "No collections found";
        return new ControllerResponse(code, data);
    }

    async getUserDefault(id: number | string) {
        const result = await CollectionInstance.getUserDefault(id);
        const code = (result !== null) ? StatusCode.OK : StatusCode.NotFound;
        const data = result || "No default collection found"
        return new ControllerResponse(code, data);
    }
    
    async post(body: ICollection) {
        const result = await CollectionInstance.post(body);
        const code = (result !== null) ? StatusCode.NewContent : StatusCode.BadRequest;
        const data = result || "Something went wrong"
        return new ControllerResponse(code, data);
    }

    async getSubscriptions(userid: number | string) {
        const result = await CollectionInstance.getSubscriptions(userid);
        const code = (result !== null) ? StatusCode.OK : StatusCode.NoContent;
        return new ControllerResponse(code, (result || "No subscriptions found"));
    }

    async postSubscription(collectionid: number | string, userid: number | string) {
        const { code, data } = await CollectionInstance.postSubscription(collectionid, userid);
        return new ControllerResponse(code, data);
    }
}