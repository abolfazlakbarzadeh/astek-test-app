import {z} from "zod";

export const productCreateSchema = z.object({
    name: z.string(),
    description: z.string(),
    price: z.number().min(1),
})