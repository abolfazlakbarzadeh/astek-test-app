import http, {type AxiosCustomResponse, type AxiosException} from "@/lib/http.ts";
import type {User} from "@/types.ts";
import {handleApiError} from "@/services/utils.ts";
import {z} from "zod";
import {userCreateSchema} from "@/pages/dashboard/users/userCreateSchema.ts";

export class UsersService {
    static async getAll() {
        return http.get<Omit<User, "role">[]>('/users').catch((error: AxiosException) => {
            handleApiError(error)
            return Promise.reject(error);
        })
    }
    static async get(user_id: number) {
        return http.get<Omit<User, "role">>(`/users/${user_id}`).catch((error: AxiosException) => {
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
    static async create(payload: z.infer<typeof userCreateSchema>) {
        return http.post<AxiosCustomResponse>(`/users`, payload).catch((error: AxiosException) => {
            handleApiError(error)
            return Promise.reject(error);
        })
    }
    static async edit(user_id: number, payload: z.infer<typeof userCreateSchema>) {
        return http.put<AxiosCustomResponse>(`/users/${user_id}`, payload).catch((error: AxiosException) => {
            handleApiError(error)
            return Promise.reject(error);
        })
    }
}