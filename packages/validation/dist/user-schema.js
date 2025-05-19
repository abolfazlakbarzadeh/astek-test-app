"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAssignRoleSchema = exports.userSchema = exports.userEditSchema = void 0;
const zod_1 = require("zod");
exports.userEditSchema = zod_1.z.object({
    name: zod_1.z.string(),
    phone: zod_1.z.string(),
    password: zod_1.z.string().optional(),
    is_super_admin: zod_1.z.boolean(),
    role_id: zod_1.z.number(),
});
exports.userSchema = exports.userEditSchema.extend({
    username: zod_1.z.string(),
    password: zod_1.z.string(),
});
exports.userAssignRoleSchema = zod_1.z.object({
    role_id: zod_1.z.number(),
});
