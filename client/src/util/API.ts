import { AxiosError, AxiosHeaders, AxiosRequestHeaders, AxiosResponse } from "axios";
import { IUser, IUserAuth, IFriendship, IRecipe, IIngredient, ICollection, IGroceryList } from "../schemas";
import { default as _instance } from "./axiosInstance";

module API {
    export enum CRUDMETHOD {
        GET,
        PUT,
        POST,
        DELETE
    }

    export class Settings {
        private static APISTRING = import.meta.env.APISTRING || "http://localhost:8080";
        private static token?: string;

        public static getAPISTRING() {
            return Settings.APISTRING;
        }

        public static getToken() {
            return Settings.token;
        }

        public static setToken(newToken: string) {
            Settings.token = newToken;
        }
    }

    abstract class RestController<T> {
        protected instance = _instance;
        protected endpoint: string;
        protected headers?: any;

        constructor(endpoint: string, token: string) {
            this.endpoint = endpoint;
            this.headers = {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": ("Bearer " + token)
                }
            };
        }

        protected async customRoute(method: CRUDMETHOD, path: string, data?: any, requireHeaders = true) {
            switch (method) {
                case CRUDMETHOD.GET:
                    return this.instance.get(this.endpoint + path, (requireHeaders && this.headers));
                case CRUDMETHOD.PUT:
                    return this.instance.put(this.endpoint + path, data, (requireHeaders && this.headers));
                case CRUDMETHOD.POST:
                    return this.instance.post(this.endpoint + path, data, (requireHeaders && this.headers));
                case CRUDMETHOD.DELETE:
                    return this.instance.delete(this.endpoint + path, (requireHeaders && this.headers));
            }
        }

        async getAll() {
            const response = await this.instance.get(this.endpoint, this.headers);
            return Promise.resolve(response.data);
        }

        async getByID(id: string) {
            const response = await this.instance.get(this.endpoint + "/" + id, this.headers);
            return Promise.resolve(response.data);
        }

        async post(data: T) {
            console.log(data);
            const response = await this.instance.post(this.endpoint, data, this.headers);
            return Promise.resolve(response.data);
        }

        async put(id: string, data: T | Partial<T>) {
            const response = await this.instance.put(this.endpoint + "/" + id, JSON.stringify(data), this.headers);
            return Promise.resolve(response.data);
        }

        async delete(id: string) {
            const response = await this.instance.delete(this.endpoint + '/' + id, this.headers);
            return Promise.resolve(response.data);
        }
    }

    export class Auth {
        private instance = _instance;
        private endpoint = Settings.getAPISTRING() + "/auth";

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
        constructor(token: string) {
            super(Settings.getAPISTRING() + "/app/users", token);
        }
    }

    export class Friendship extends RestController<IFriendship> {
        constructor(token: string) {
            super(Settings.getAPISTRING() + "/app/friend", token);
        }

        override async getAll() {
            try {
                const response = await this.instance.get(this.endpoint, this.headers);
                return Promise.resolve(response.data);
            } catch(e) {
                const error = e as AxiosError;
                if (error.response?.status == 404) {
                    console.log('no friends found');
                    return [];
                }
            }
        }

        async getTargetUserFriendships(id: string | number) {
            try {
                const response = await this.instance.get(this.endpoint + `?targetUser=${id}`, this.headers);
                return Promise.resolve(response.data);
            } catch (e) {
                const error = e as AxiosError;
                if (error.response?.status == 404) {
                    console.log('no friends found');
                    return [];
                }
            }
        }

        async getPendingFriendRequests() {
            const response = await this.instance.get(this.endpoint + "?pending=true", this.headers);
            return Promise.resolve(response.data);
        }

        async addFriend(id: string | number) {
            const response = await this.instance.post(this.endpoint + `/${id}`, this.headers);
            return Promise.resolve(response.data);
        }
    }

    export class Recipe extends RestController<IRecipe> {
        constructor(token: string) {
            super(Settings.getAPISTRING() + "/app/recipe", token);
        }
    }

    export class Ingredient extends RestController<IIngredient> {
        constructor(token: string) {
            super(Settings.getAPISTRING() + "/app/ingredients", token);
        }
    }

    export class Collection extends RestController<ICollection> {
        constructor(token: string) {
            super(Settings.getAPISTRING() + "/app/collection", token);
        }

        async getRecipesFromOne(id?: number | string) {
            const response = await this.instance.get(this.endpoint + `/${id}?getRecipes=true`, this.headers);
            return Promise.resolve(response.data);
        }

        async getAllAuthored(id?: number | string) {
            let response: AxiosResponse;

            if (id) {
                response = await this.customRoute(CRUDMETHOD.GET, `?authored=true&authorID=${id}`);
            } else {
                response = await this.customRoute(CRUDMETHOD.GET, "?authored=true");
            }

            return Promise.resolve(response.data);
        }
    }

    export class GroceryList extends RestController<IGroceryList> {
        constructor(token: string) {
            super(Settings.getAPISTRING() + "/app/grocery-list", token)
        }
    }
}

export default API