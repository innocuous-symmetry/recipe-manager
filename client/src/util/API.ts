import { AxiosHeaders, AxiosRequestHeaders } from "axios";
import { IUser, IUserAuth, IFriendship, IRecipe, IIngredient, ICollection, IGroceryList } from "../schemas";
import { default as _instance } from "./axiosInstance";

module API {
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
        protected headers?: any

        constructor(endpoint: string) {
            this.endpoint = endpoint;

            if (Settings.getToken()) {
                this.headers = {
                    "Content-Type": "application/json",
                    "Authorization": ("Bearer " + Settings.getToken())
                };
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
        constructor() {
            super(Settings.getAPISTRING() + "/app/users");
        }
    }

    export class Friendship extends RestController<IFriendship> {
        constructor() {
            super(Settings.getAPISTRING() + "/app/friends");
        }

        async getPendingFriendRequests() {
            const response = await this.instance.get(this.endpoint + "?pending=true", this.headers);
            return Promise.resolve(response.data);
        }
    }

    export class Recipe extends RestController<IRecipe> {
        constructor() {
            super(Settings.getAPISTRING() + "/app/recipes");
        }
    }

    export class Ingredient extends RestController<IIngredient> {
        constructor() {
            super(Settings.getAPISTRING() + "/app/ingredients");
        }
    }

    export class Collection extends RestController<ICollection> {
        constructor() {
            super(Settings.getAPISTRING() + "/app/collection");
        }
    }

    export class GroceryList extends RestController<IGroceryList> {
        constructor() {
            super(Settings.getAPISTRING() + "/app/grocery-list")
        }
    }
}

export default API