import {z} from "zod";

export const roleCreateSchema = z.object({
    name: z.string(),
    permissions: z.string().array(),
})