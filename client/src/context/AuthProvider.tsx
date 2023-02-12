import { FC, Provider, ReactPortal, useEffect, useState } from "react"
import { IUser } from "../schemas";
import { AuthContext, IAuthContext } from "./AuthContext";

const AuthProvider = ({ children }: any) => {
    const [user, setUser] = useState<IUser>();
    const [token, setToken] = useState<string>();

    const value = { user, setUser, token, setToken }

    return (
        <AuthContext.Provider value={ value }>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthProvider;