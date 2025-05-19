"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleSchema = void 0;
const zod_1 = require("zod");
exports.roleSchema = zod_1.z.object({
    name: zod_1.z.string(),
    permissions: zod_1.z.string().array(),
});
