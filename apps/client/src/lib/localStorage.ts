import type {IAuthContext} from "@/context/auth-context.tsx";

export const getAuth = (): Omit<IAuthContext, "login" | "logout"> => {
    const stored = localStorage.getItem('auth');
    return stored ? JSON.parse(stored) : { loggedIn: false };
}
export const clearAuth = () => {
    localStorage.removeItem('auth');
}