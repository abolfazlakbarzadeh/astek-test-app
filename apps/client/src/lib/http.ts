import axios, { AxiosError } from 'axios';
import {env} from "@/environment.ts";
import {getAuth} from "@/lib/localStorage.ts";

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

export default axiosIns;


export type AxiosException = AxiosError<{
    message: string;
}>