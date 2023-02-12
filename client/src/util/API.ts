import { AxiosHeaders, AxiosRequestHeaders } from "axios";
import { IUser, IUserAuth, IFriendship, IRecipe, IIngredient, ICollection, IGroceryList } from "../schemas";
import { default as _instance } from "./axiosInstance";

export module API {
    const APISTRING = import.meta.env.APISTRING || "http://localhost:8080";

    abstract class RestController<T> {
        protected instance = _instance;
        protected endpoint: string;
        protected token?: string;
        protected headers?: any

        constructor(endpoint: string, token?: string) {
            this.endpoint = endpoint;
            this.token = token;

            if (token) {
                this.headers = {
                    "Content-Type": "application/json",
                    "Authorization": ("Bearer " + token)
                };
            }
        }

        async getAll() {
            if (!this.token) return null;

            const response = await this.instance.get(this.endpoint, this.headers);
            return Promise.resolve(response.data);
        }

        async getByID(id: string) {
            if (!this.token) return null;

            const response = await this.instance.get(this.endpoint + "/" + id, this.headers);
            return Promise.resolve(response.data);
        }

        async postOne(data: T) {
            if (!this.token) return null;

            const response = await this.instance.post(this.endpoint, data, this.headers);
            return Promise.resolve(response.data);
        }

        async put(id: string, data: T | Partial<T>) {
            if (!this.token) return null;

            const response = await this.instance.put(this.endpoint + "/" + id, data, this.headers);
            return Promise.resolve(response.data);
        }

        async delete(id: string) {
            if (!this.token) return null;

            const response = await this.instance.delete(this.endpoint + '/' + id, this.headers);
            return Promise.resolve(response.data);
        }
    }

    export class Auth {
        private instance = _instance;
        private endpoint = APISTRING + "/auth";

        async login(data: IUserAuth | Partial<IUser>) {
            try {
                const response = await this.instance.post(this.endpoint + "/login", data);
                return Promise.resolve(response.data);
            } catch (e: any) {
                console.error(e);
            }
        }

        async register(data: IUser) {
            try {
                const response = await this.instance.post(this.endpoint + "/register", data);
                return Promise.resolve(response.data);
            } catch (e: any) {
                console.error(e);
            }
        }

        async logout() {
            try {
                const response = await this.instance.delete(this.endpoint + '/logout');
    
                // unset cookie data and send response
                document.cookie = `token=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
                return Promise.resolve(response.data);
            } catch(err) {
                console.error(err);
            }
        }

        // for future use
        async registerGoogle() {
            return;
        }

        async loginGoogle() {
            return;
        }

        async logoutGoogle() {
            return;
        }
    }

    export class User extends RestController<IUser> {
        constructor() {
            super(APISTRING + "/app/users");
        }
    }

    export class Friendship extends RestController<IFriendship> {
        constructor() {
            super(APISTRING + "/app/friends");
        }

        async getPendingFriendRequests() {
            if (!this.token) return null;

            const response = await this.instance.get(this.endpoint + "?pending=true", this.headers);
            return Promise.resolve(response.data);
        }
    }

    export class Recipe extends RestController<IRecipe> {
        constructor() {
            super(APISTRING + "/app/recipes");
        }
    }

    export class Ingredient extends RestController<IIngredient> {
        constructor() {
            super(APISTRING + "/app/ingredients");
        }
    }

    export class Collection extends RestController<ICollection> {
        constructor() {
            super(APISTRING + "/app/collections");
        }
    }

    export class GroceryList extends RestController<IGroceryList> {
        constructor() {
            super(APISTRING + "/app/grocery-list")
        }
    }
}