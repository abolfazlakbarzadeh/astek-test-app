import http, {type AxiosCustomResponse, type AxiosException} from "@/lib/http.ts";
import type {Product} from "@/types.ts";
import {handleApiError} from "@/services/utils.ts";
import {z} from "zod";
import {productCreateSchema} from "@/pages/dashboard/products/productCreateSchema.ts";

export class ProductsService {
    static async getAll() {
        return http.get<Product[]>('/products').catch((error: AxiosException) => {
            handleApiError(error)
            return Promise.reject(error);
        })
    }

    static async get(product_id: number) {
        return http.get<Product>(`/products/${product_id}`).catch((error: AxiosException) => {
            handleApiError(error)
            return Promise.reject(error);
        })
    }

    static async delete(product_id: number,) {
        return http.delete<AxiosCustomResponse>(`/products/${product_id}`).catch((error: AxiosException) => {
            handleApiError(error)
            return Promise.reject(error);
        })
    }

    static async create(payload: z.infer<typeof productCreateSchema>) {
        return http.post<AxiosCustomResponse>(`/products`, payload).catch((error: AxiosException) => {
            handleApiError(error)
            return Promise.reject(error);
        })
    }

    static async edit(product_id: number, payload: z.infer<typeof productCreateSchema>) {
        return http.put<AxiosCustomResponse>(`/products/${product_id}`, payload).catch((error: AxiosException) => {
            handleApiError(error)
            return Promise.reject(error);
        })
    }
}