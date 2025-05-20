import axios, {AxiosError} from 'axios';
import {env} from "@/environment.ts";
import {clearAuth, getAuth} from "@/lib/localStorage.ts";


export type AxiosException = AxiosError<{
    message: string;
}>
export type AxiosCustomResponse = {
    message: string;
}
const axiosIns = axios.create({
    baseURL: env.apiUrl,
})

axiosIns.interceptors.request.use((config) => {
    const auth = getAuth()

    if (auth.loggedIn) {
        config.headers.Authorization = `Bearer ${auth.token}`
    }

    return config
})

axiosIns.interceptors.response.use((res) => res, (error: AxiosException) => {
    if (error.status === 403 && error.response?.data.message == "Invalid token") {
        clearAuth()
        window.location.reload()
    } else
        return Promise.reject(error)
})

export default axiosIns;
