import {useEffect} from "react";
import {toast} from "react-toastify";
import {useAuth} from "@/context/auth-context.tsx";

export const usePermission = (permission: string, denied: () => void, grants: () => void) => {
    const auth = useAuth()
    useEffect(() => {
        if (!auth.hasPermission?.(permission)) {
            denied()
            toast.error("You dont have access to this part");
        } else {
            grants()
        }
    }, []);
}