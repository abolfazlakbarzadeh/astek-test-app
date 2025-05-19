import {z} from "zod";

export const userEditSchema = z.object({
    name: z.string(),
    phone: z.string(),
    password: z.string().optional(),
    is_super_admin: z.boolean(),
    role: z.string().optional()
})
export const userCreateSchema = userEditSchema.extend({
    username: z.string(),
    password: z.string(),
})