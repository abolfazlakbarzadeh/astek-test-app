import { z } from "zod";
export declare const productSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    price: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    name?: string;
    description?: string;
    price?: number;
}, {
    name?: string;
    description?: string;
    price?: number;
}>;
//# sourceMappingURL=product-schema.d.ts.map