import { createContext, useContext } from "react";
import { IUser } from "../schemas";


interface IAuthContext {
    user?: IUser
}

const defaultValue: IAuthContext = {
    user: undefined,
}

export const AuthContext = createContext<IAuthContext>(defaultValue);

export const useAuthContext = () => useContext(AuthContext);
