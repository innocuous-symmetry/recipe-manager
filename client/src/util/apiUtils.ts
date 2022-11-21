import { IUser } from "../schemas";
const API = import.meta.env.APISTRING || "http://localhost:8080/";

// auth handlers
export const attemptLogin = async (email: string, password: string) => {
    const result = await fetch(API + 'auth/login/', { method: "POST" })
        .then(response => response.json());
    
    return result;
}

export const attemptRegister = async (data: IUser) => {
    const result = await fetch(API + 'auth/register/', { method: "POST" })
        .then(response => response.json());
    
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