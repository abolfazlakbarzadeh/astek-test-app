import {z} from "zod";

export const userCreateSchema = z.object({
    username: z.string(),
    name: z.string(),
    phone: z.string().regex(/09[0-9]{9}/, {message: 'Invalid phone number'}),
    password: z.string().optional(),
    role_id: z.number(),
    is_super_admin: z.boolean().optional(),
})