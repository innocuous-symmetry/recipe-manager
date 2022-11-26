import createError from "http-errors";
import { ICollection } from "../schemas";
import { Collection } from "../models/collection";
const CollectionInstance = new Collection();

export default class CollectionCtl {
    async getOne(id: string) {
        const result = await CollectionInstance.getOne(id);
        if (!result) throw createError('404', 'Collection not found');
        return result;
    }

    async getAll() {
        const result = await CollectionInstance.getAll();
        if (!result) throw createError('404', 'No collections found');
        return result;
    }
    
    async post(data: ICollection) {
        const result = await CollectionInstance.post(data);
        if (!result) throw createError('400', 'Bad request');
        return result;
    }

    async getSubscriptions(userid: string) {
        const result = await CollectionInstance.getSubscriptions(userid);
        if (!result) throw createError('404', 'No subscriptions found');
        return result;
    }

    async postSubscription(collectionid: string, userid: string) {
        const { ok, code, data } = await CollectionInstance.postSubscription(collectionid, userid);
        
        if (ok) {
            return data;
        } else {
            throw createError(code, data);
        }
    }
}