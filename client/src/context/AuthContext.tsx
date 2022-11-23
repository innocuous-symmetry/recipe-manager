import { createContext, Dispatch, SetStateAction, useContext } from "react";
import { IUser } from "../schemas";

export interface IAuthContext {
    user?: IUser
}

export const defaultValue: IAuthContext = {
    user: undefined
}

export const AuthContext = createContext<IAuthContext>(defaultValue);

export const useAuthContext = () => useContext(AuthContext);
