import { IUser, IUserAuth } from "../schemas";
const API = import.meta.env.APISTRING || "http://localhost:8080/";

export const getBaseAPI = async () => {
    return fetch(API);
}

export const getCookies = async () => {
    return fetch(API + 'auth');
}

// auth handlers
export const attemptLogin = async (data: IUserAuth) => {
    const success = await fetch(API + 'auth/login/', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(response => response.json());
    
    if (success) return success;
    return null;
}

export const attemptLogout = async () => {
    const result = await fetch(API + 'auth/logout', { method: "DELETE" }).then(response => response.json());
    return result;
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