import express, {RequestHandler} from "express";
import {UsersController} from "../controllers/users-controller";
import {accessMiddleware} from "../middlewares/access-middleware";
const router = express.Router();

router.get('/', accessMiddleware(), UsersController.index as any)
router.get('/:id', accessMiddleware(), UsersController.get as any)

export default router