import { createContext, Dispatch, SetStateAction, useContext } from "react";
import { IUser } from "../schemas";

export interface IAuthContext {
    user?: IUser
    setUser: Dispatch<SetStateAction<IUser>> | VoidFunction
}

export const defaultValue: IAuthContext = {
    user: undefined,
    setUser: () => {}
}

export const AuthContext = createContext<IAuthContext>(defaultValue);

export const useAuthContext = () => useContext(AuthContext);
