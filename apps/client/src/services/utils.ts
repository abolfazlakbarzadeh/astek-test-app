import type {AxiosException} from "@/lib/http.ts";
import {toast} from "react-toastify";

export const handleApiError = (error: AxiosException) => {
    if (error.status && error.status < 500)
        toast.error(error.response?.data?.message);
}