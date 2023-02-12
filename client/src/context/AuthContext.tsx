import { createContext, Dispatch, SetStateAction, useContext } from "react";
import { IUser } from "../schemas";

export interface IAuthContext {
    user: IUser | undefined
    setUser: Dispatch<SetStateAction<IUser | undefined>> | VoidFunction
    token: string | undefined
    setToken: Dispatch<SetStateAction<string | undefined>> | VoidFunction
}

export const defaultValue: IAuthContext = {
    user: undefined,
    setUser: () => {},
    token: undefined,
    setToken: () => {}
}

export const AuthContext = createContext<IAuthContext>(defaultValue);

export const useAuthContext = () => useContext(AuthContext);
