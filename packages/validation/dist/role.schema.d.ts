import { z } from "zod";
export declare const roleSchema: z.ZodObject<{
    name: z.ZodString;
    permissions: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    name?: string;
    permissions?: string[];
}, {
    name?: string;
    permissions?: string[];
}>;
//# sourceMappingURL=role.schema.d.ts.map