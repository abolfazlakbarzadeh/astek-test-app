import { z } from "zod";
export declare const userEditSchema: z.ZodObject<{
    name: z.ZodString;
    phone: z.ZodString;
    password: z.ZodOptional<z.ZodString>;
    is_super_admin: z.ZodBoolean;
    role_id: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    name?: string;
    phone?: string;
    password?: string;
    is_super_admin?: boolean;
    role_id?: number;
}, {
    name?: string;
    phone?: string;
    password?: string;
    is_super_admin?: boolean;
    role_id?: number;
}>;
export declare const userSchema: z.ZodObject<{
    name: z.ZodString;
    phone: z.ZodString;
    is_super_admin: z.ZodBoolean;
    role_id: z.ZodNumber;
} & {
    username: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name?: string;
    phone?: string;
    password?: string;
    is_super_admin?: boolean;
    role_id?: number;
    username?: string;
}, {
    name?: string;
    phone?: string;
    password?: string;
    is_super_admin?: boolean;
    role_id?: number;
    username?: string;
}>;
export declare const userAssignRoleSchema: z.ZodObject<{
    role_id: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    role_id?: number;
}, {
    role_id?: number;
}>;
//# sourceMappingURL=user-schema.d.ts.map