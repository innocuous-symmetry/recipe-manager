import { IUser, IUserAuth } from "../schemas";
const API = import.meta.env.APISTRING || "http://localhost:8080/";

// auth handlers
export const attemptLogin = async (data: IUserAuth) => {
    const result: Array<keyof IUser> | null = await fetch(API + 'auth/login/', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(response => response.json());
    
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