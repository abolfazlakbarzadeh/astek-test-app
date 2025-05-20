import express from "express";
import {AuthController} from "../controllers/auth-controller";
import {authenticateJWT} from "../middlewares/auth-middleware";

const router = express.Router();

router.post('/login', AuthController.login as any)
router.get('/me', authenticateJWT, AuthController.me as any)


export default router;