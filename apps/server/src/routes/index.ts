import express from "express";
import auth from "./auth";
import {authenticateJWT} from "../middlewares/auth-middleware";
import users from "./users";
import roles from "./roles";
import products from "./products";

const router = express.Router();

router.use('/auth', auth);
router.use('/users', authenticateJWT, users);
router.use('/roles', authenticateJWT, roles);
router.use('/products', authenticateJWT, products);

export default router