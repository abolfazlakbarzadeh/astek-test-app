import {createContext, type FC, type PropsWithChildren, useContext, useEffect, useState} from "react";
import type {User} from "@/types.ts";
import {getAuth} from "@/lib/localStorage.ts";
import {AuthService} from "@/services/auth-service.ts";

export interface IAuthContext {
    loggedIn: boolean;
    user?: User;
    token?: string;
    login: (token: string) => void | Promise<void>;
    logout: () => void,
    hasPermission?: (permission: string) => boolean,
}

export const AuthContext = createContext<IAuthContext>({
    loggedIn: false,
} as any);

export const AuthContextProvider: FC<PropsWithChildren> = ({children}) => {

    const [auth, setAuth] = useState(() => getAuth());

    useEffect(() => {
        localStorage.setItem('auth', JSON.stringify(auth));
    }, [auth]);

    const login = async (token: string) => {
        const user = await AuthService.getUser(token)
        setAuth({
            loggedIn: true,
            token,
            user: user.data
        })
    };

    const logout = () => {
        setAuth({loggedIn: false});
    };

    const hasPermission = (permission: string) => {
        if (auth.user?.is_super_admin) return true

        return !!auth.user?.role?.permissions.some(per => per == permission)
    }

    return (
        <AuthContext.Provider value={{...auth, login, logout, hasPermission}}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth = () => useContext(AuthContext)