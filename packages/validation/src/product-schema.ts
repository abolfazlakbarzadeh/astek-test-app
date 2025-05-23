import {z} from "zod";

export const productSchema = z.object({
    name: z.string(),
    description: z.string().optional(),
    price: z.number(),
})