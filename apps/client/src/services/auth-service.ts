import http, {type AxiosException} from "@/lib/http.ts";
import type {User} from "@/types.ts";
import type {AxiosResponse} from 'axios'
import {handleApiError} from "@/services/utils.ts";

export class AuthService {
    static async login(username: string, password: string) {
        return http.post<{ token: string }>('/auth/login', {username, password}).catch((error: AxiosException) => {
            handleApiError(error)
            return Promise.reject(error);
        })
    }

    static async getUser(token: string): Promise<AxiosResponse<User>> {
        return http.get<User>('/auth/me', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).catch((error: AxiosException) => {
            handleApiError(error)
            return Promise.reject(error);
        })
    }
}