import http, {type AxiosCustomResponse, type AxiosException} from "@/lib/http.ts";
import type {Product, Role} from "@/types.ts";
import {handleApiError} from "@/services/utils.ts";
import {z} from "zod";
import {roleCreateSchema} from "@/pages/dashboard/roles/roleCreateSchema.ts";

export class RolesService {
    static async getAll() {
        return http.get<Role[]>('/roles').catch((error: AxiosException) => {
            handleApiError(error)
            return Promise.reject(error);
        })
    }
    static async get(role_id: number) {
        return http.get<Product>(`/roles/${role_id}`).catch((error: AxiosException) => {
            handleApiError(error)
            return Promise.reject(error);
        })
    }

    static async delete(role_id: number,) {
        return http.delete<AxiosCustomResponse>(`/roles/${role_id}`).catch((error: AxiosException) => {
            handleApiError(error)
            return Promise.reject(error);
        })
    }

    static async create(payload: z.infer<typeof roleCreateSchema>) {
        return http.post<AxiosCustomResponse>(`/roles`, payload).catch((error: AxiosException) => {
            handleApiError(error)
            return Promise.reject(error);
        })
    }

    static async edit(role_id: number, payload: z.infer<typeof roleCreateSchema>) {
        return http.put<AxiosCustomResponse>(`/roles/${role_id}`, payload).catch((error: AxiosException) => {
            handleApiError(error)
            return Promise.reject(error);
        })
    }
}