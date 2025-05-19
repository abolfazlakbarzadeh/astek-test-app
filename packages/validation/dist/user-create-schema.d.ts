import { z } from "zod";
export declare const userEditSchema: z.ZodObject<{
    name: z.ZodString;
    phone: z.ZodString;
    password: z.ZodOptional<z.ZodString>;
    is_super_admin: z.ZodBoolean;
    role: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name?: string;
    phone?: string;
    password?: string;
    is_super_admin?: boolean;
    role?: string;
}, {
    name?: string;
    phone?: string;
    password?: string;
    is_super_admin?: boolean;
    role?: string;
}>;
export declare const userCreateSchema: z.ZodObject<{
    name: z.ZodString;
    phone: z.ZodString;
    is_super_admin: z.ZodBoolean;
    role: z.ZodOptional<z.ZodString>;
} & {
    username: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name?: string;
    phone?: string;
    password?: string;
    is_super_admin?: boolean;
    role?: string;
    username?: string;
}, {
    name?: string;
    phone?: string;
    password?: string;
    is_super_admin?: boolean;
    role?: string;
    username?: string;
}>;
//# sourceMappingURL=user-create-schema.d.ts.map