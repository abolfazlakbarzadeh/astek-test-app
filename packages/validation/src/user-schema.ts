import {z} from "zod";

export const userEditSchema = z.object({
    name: z.string(),
    phone: z.string(),
    password: z.string().optional(),
    is_super_admin: z.boolean(),
    role_id: z.number(),
})
export const userSchema = userEditSchema.extend({
    username: z.string(),
    password: z.string(),
})
export const userAssignRoleSchema = z.object({
    role_id: z.number(),
})