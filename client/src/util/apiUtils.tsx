import { IUser, IUserAuth } from "../schemas";
import axios from "axios";
const API = import.meta.env.APISTRING || "http://localhost:8080";

axios.defaults.withCredentials = true;
axios.defaults.headers['Content-Type'] = 'application/json';

export const getBaseAPI = async () => {
    return fetch(API);
}

// auth handlers
export const attemptLogin = async (data: IUserAuth) => {
    try {
        const response = await axios({
            method: "POST",
            url: API + '/auth/login',
            data: data
        });

        return Promise.resolve(response.data);
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
    // const result = await fetch(API + 'recipe').then(response => response.json());
    // return result;
}