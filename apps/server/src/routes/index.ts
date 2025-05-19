import express from "express";
import auth from "./auth";
import {authenticateJWT} from "../middlewares/auth-middleware";
import users from "./users";

const router = express.Router();

router.use('/auth', auth);
router.use('/users', authenticateJWT, users);

export default router