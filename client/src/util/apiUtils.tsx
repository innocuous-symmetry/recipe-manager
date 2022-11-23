import { IUser, IUserAuth } from "../schemas";
import axios from "axios";
const API = import.meta.env.APISTRING || "http://localhost:8080";

axios.defaults.withCredentials = true;

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

        const data = Promise.resolve(response.data);
        return data;
    } catch (e: any) {
        throw e;
        
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
    // const result = await fetch(API + 'auth/logout', { method: "DELETE" }).then(response => response.json());
    // return result;
}

export const attemptRegister = async (data: IUser) => {
    const result = await fetch(API + 'auth/register/', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(response => response.json());
    
    return result;
}

// on recipe route
export const getRecipeByID = async (id: string | number) => {
    const result = await fetch(API + 'recipe/' + id).then(response => response.json());
    return result;
}

export const getAllRecipes = async () => {
    const result = await fetch(API + 'recipe').then(response => response.json());
    return result;
}