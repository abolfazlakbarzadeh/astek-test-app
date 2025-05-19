import {z} from "zod";

export const roleSchema = z.object({
    name: z.string(),
    permissions: z.string().array(),
})