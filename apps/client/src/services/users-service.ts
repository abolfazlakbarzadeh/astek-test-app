import http, {type AxiosCustomResponse, type AxiosException} from "@/lib/http.ts";
import type {User} from "@/types.ts";
import {handleApiError} from "@/services/utils.ts";

export class UsersService {
    static async getAll() {
        return http.get<Omit<User, "role">[]>('/users').catch((error: AxiosException) => {
            handleApiError(error)
            return Promise.reject(error);
        })
    }
    static async assignRole(user_id: number, role_id: number) {
        return http.put<AxiosCustomResponse>(`/users/${user_id}/assign-role`, {
            role_id
        }).catch((error: AxiosException) => {
            handleApiError(error)
            return Promise.reject(error);
        })
    }
    static async delete(user_id: number,) {
        return http.delete<AxiosCustomResponse>(`/users/${user_id}`).catch((error: AxiosException) => {
            handleApiError(error)
            return Promise.reject(error);
        })
    }
}