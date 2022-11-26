import { IUser, IUserAuth } from "../schemas";
import { IAuthContext } from "../context/AuthContext";
import axios from "axios";
const API = import.meta.env.APISTRING || "http://localhost:8080";

axios.defaults.withCredentials = true;
axios.defaults.headers['Content-Type'] = 'application/json';

export const getBaseAPI = async () => {
    return fetch(API);
}

// auth handlers
export const attemptLogin = async (data: IUserAuth): Promise<IAuthContext> => {
    try {
        const response = await axios({
            method: "POST",
            url: API + '/auth/login',
            data: data
        });

        const result: Promise<IAuthContext> = Promise.resolve(response.data);
        return result;
    } catch (e: any) {
        throw e;
    }
}

export const checkCredientials = async () => {
    try {
        const response = await axios({
            method: "GET",
            url: API + '/auth',
        });

        return Promise.resolve(response.data);
    } catch (e: any) {
        console.log(e);
    }
}

export const attemptLogout = async () => {
    try {
        await axios({
            method: "DELETE",
            url: API + '/auth/logout',
        })

        return true;
    } catch (e: any) {
        throw e;
    }
}

export const attemptRegister = async (body: IUser) => {
    try {
        const response = await axios({
            method: "POST",
            url: API + '/auth/register',
            data: JSON.stringify(body)
        })

        return Promise.resolve(response.data);
    } catch (e: any) {
        throw e;
    }
}

// for user friendships
export const getFriendships = async () => {
    try {
        const response = await axios({
            method: "GET",
            url: API + '/friend'
        })

        return Promise.resolve(response.data);
    } catch (e: any) {
        throw e;
    }
}

// on recipe route
export const getRecipeByID = async (id: string | number) => {
    try {
        const response = await axios({
            method: "GET",
            url: API + '/recipe/' + id
        })

        return Promise.resolve(response.data);
    } catch (e: any) {
        throw e;
    }
}

export const getAllRecipes = async () => {
    try {
        const response = await axios({
            method: "GET",
            url: API + '/recipe'
        })

        return Promise.resolve(response.data);
    } catch (e: any) {
        throw e;
    }
}
