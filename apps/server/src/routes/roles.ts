import express from "express";
import {accessMiddleware} from "../middlewares/access-middleware";
import {permissions} from "validation";
import {RolesController} from "../controllers/roles-controller";
import {selfMiddleware} from "../middlewares/self-middleware";

const router = express.Router();

router.get("/", accessMiddleware(undefined, [permissions.role_management.view]), RolesController.index as any)
router.get("/:id", accessMiddleware(undefined, [permissions.role_management.view]), RolesController.get as any)
router.post("/", accessMiddleware(undefined, [permissions.role_management.create]), RolesController.create as any)
router.put("/:id", accessMiddleware(undefined, [permissions.role_management.edit]), RolesController.update as any)
router.delete("/:id", accessMiddleware(undefined, [permissions.role_management.edit]), RolesController.delete as any)

export default router;