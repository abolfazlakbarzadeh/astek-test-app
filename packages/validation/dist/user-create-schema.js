"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userCreateSchema = exports.userEditSchema = void 0;
const zod_1 = require("zod");
exports.userEditSchema = zod_1.z.object({
    name: zod_1.z.string(),
    phone: zod_1.z.string(),
    password: zod_1.z.string().optional(),
    is_super_admin: zod_1.z.boolean(),
    role: zod_1.z.string().optional()
});
exports.userCreateSchema = exports.userEditSchema.extend({
    username: zod_1.z.string(),
    password: zod_1.z.string(),
});
