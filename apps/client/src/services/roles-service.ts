import http, {type AxiosException} from "@/lib/http.ts";
import type {Role} from "@/types.ts";
import {handleApiError} from "@/services/utils.ts";

export class RolesService {
    static async getAll() {
        return http.get<Role[]>('/roles').catch((error: AxiosException) => {
            handleApiError(error)
            return Promise.reject(error);
        })
    }
}