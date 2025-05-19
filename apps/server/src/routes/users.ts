import express from "express";
import {UsersController} from "../controllers/users-controller";
import {accessMiddleware} from "../middlewares/access-middleware";
import {permissions} from "validation";
import {selfMiddleware} from "../middlewares/self-middleware";

const router = express.Router();

router.get('/', accessMiddleware(), UsersController.index as any)
router.get('/:id', selfMiddleware(), UsersController.get as any)
router.post('/', accessMiddleware(), UsersController.create as any)
router.put('/:id', selfMiddleware(), UsersController.update as any)
router.delete('/:id', accessMiddleware(undefined, [permissions.account_management.edit]), UsersController.delete as any)
router.put('/:id/assign-role', accessMiddleware(undefined, [permissions.account_management.assignRole]), UsersController.assignRole as any)

export default router