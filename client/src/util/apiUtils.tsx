import { ICollection, IUser, IUserAuth } from "../schemas";
// import { IAuthContext } from "../context/AuthContext";
import axios from "axios";
const API = import.meta.env.APISTRING || "http://localhost:8080";

export const getBaseAPI = async () => {
    return fetch(API);
}

// auth and general user management handlers
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

export const attemptLogin = async (data: IUserAuth) => {
    try {
        const response = await fetch(API + '/auth/login', {
            body: JSON.stringify(data),
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            }
        });

        const json = await response.json();
        console.log(json);
        return json;
        
        // const response = await axios({
        //     method: "POST",
        //     url: API + '/auth/login',
        //     data: data
        // });

        // const result = Promise.resolve(response.data);
        // return result;
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
            data: body
        })

        return Promise.resolve(response.data);
    } catch (e: any) {
        throw e;
    }
}

// methods for managing collections
export const createNewCollection = async (body: ICollection) => {
    try {
        const response = await axios({
            method: "POST",
            url: API + '/collection',
            data: JSON.stringify(body)
        })

        console.log(response);

        return Promise.resolve(response.data);
    } catch (e: any) {
        throw e;
    }
}

// for users and user friendships
export const getAllUsers = async () => {
    try {
        const response = await axios({
            method: "GET",
            url: API + '/users'
        })

        return Promise.resolve(response.data);
    } catch(e: any) {
        throw e;
    }
}

export const getUserByID = async (id: string | number) => {
    try {
        const response = await axios({
            method: "GET",
            url: API + '/users/' + id as string
        })

        return Promise.resolve(response.data);
    } catch (e: any) {
        throw e;
    }
}

export const addFriend = async (id: string) => {
    try {
        const response = await axios({
            method: "POST",
            url: API + '/friend/' + id
        })

        return Promise.resolve(response.data);
    } catch (e: any) {
        throw e;
    }
}

export const getPendingFriendRequests = async () => {
    try {
        const response = await axios({
            method: "GET",
            url: API + '/friend?pending=true'
        })

        return Promise.resolve(response.data);
    } catch (e: any) {
        throw e;
    }
}

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
