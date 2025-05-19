import express from "express";
import {ProductsController} from "../controllers/products-controller";

const router = express.Router();

router.get('/', ProductsController.index as any)
router.get('/:id', ProductsController.get as any)
router.post('/', ProductsController.create as any)
router.put('/:id', ProductsController.update as any)
router.delete('/:id', ProductsController.delete as any)

export default router