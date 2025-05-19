import express, {RequestHandler} from "express";
import {UsersController} from "../controllers/users-controller";
import {accessMiddleware} from "../middlewares/access-middleware";
const router = express.Router();

router.get('/', accessMiddleware(), UsersController.index as any)
router.get('/:id', accessMiddleware(), UsersController.get as any)
router.post('/', accessMiddleware(), UsersController.create as any)

export default router