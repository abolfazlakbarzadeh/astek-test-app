import express from "express";
import {UsersController} from "../controllers/users-controller";
import {accessMiddleware} from "../middlewares/access-middleware";
import {permissions} from "validation";
import {selfMiddleware} from "../middlewares/self-middleware";

const router = express.Router();

router.get('/', accessMiddleware(undefined, [permissions.account_management.view]), UsersController.index as any)
router.get('/:id',accessMiddleware(undefined, [permissions.account_management.edit]), selfMiddleware(), UsersController.get as any)
router.post('/', accessMiddleware(), UsersController.create as any)
router.put('/:id', accessMiddleware(undefined, [permissions.account_management.edit]), selfMiddleware(), UsersController.update as any)
router.delete('/:id', accessMiddleware(undefined, [permissions.account_management.edit]), UsersController.delete as any)
router.put('/:id/assign-role', accessMiddleware(undefined, [permissions.account_management.assignRole]), UsersController.assignRole as any)

export default router