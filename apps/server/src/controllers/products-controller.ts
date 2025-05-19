import {Response} from "express";
import {permissions, productSchema} from "validation";
import {Role} from "../models/Role";
import {AccessRequest} from "../middlewares/access-middleware";
import {returnValidationErrors, userForbidden} from "../misc/http-responses";
import {WhereOptions} from "sequelize";
import {Product} from "../models/Product";
import {User} from "../models/User";
import {AuthRequest} from "../middlewares/auth-middleware";

export class ProductsController {

    static async checkHasPermission(req: AuthRequest, permission: string) {
        if (req.user.is_super_admin) return true
        const user = await User.findOne({
            where: {
                id: req.user.id
            },
            include: [Role]
        })
        const rolePermissions = user!.role.permissions!
        return rolePermissions.some(per => per == permission);
    }

    static async getProduct(req: AuthRequest, res: Response) {
        if (!(await ProductsController.checkHasPermission(req, permissions.product_management.edit))) {
            return userForbidden(res)
        }
        const viewAll = await ProductsController.checkHasViewAllPermission(req)
        const where: WhereOptions<Product> = {
            id: req.params.id
        }
        if (!viewAll)
            where['user_id'] = req.user.id;
        return await Product.findOne({
            where
        })
    }

    static async checkHasViewAllPermission(req: AuthRequest) {
        if (req.user.is_super_admin) return true
        let viewAll = true
        if (!req.user.is_super_admin) {
            viewAll = false;
            if (await ProductsController.checkHasPermission(req, permissions.product_management.view))
                viewAll = true;
        }

        return viewAll;
    }

    static async index(req: AuthRequest, res: Response) {
        const viewAll = await ProductsController.checkHasViewAllPermission(req)

        const where: WhereOptions<Product> = {}
        if (!viewAll)
            where['user_id'] = req.user.id;
        const products = await Product.findAll({
            where
        })
        return res.json(products);
    }

    static async get(req: AccessRequest, res: Response) {
        const viewAll = await ProductsController.checkHasViewAllPermission(req)
        const where: WhereOptions<Product> = {
            id: req.params.id
        }
        if (!viewAll) {
            where['user_id'] = req.user.id;
        }

        const product = await Product.findOne({
            where,
        })

        if (!product) {
            return res.status(404).json({message: 'Product not found'});
        }

        return res.json(product);
    }

    static async create(req: AuthRequest, res: Response) {
        if (!(await ProductsController.checkHasPermission(req, permissions.product_management.create))) {
            return userForbidden(res)
        }
        const validation = productSchema.safeParse(req.body)
        if (!validation.success) {
            return returnValidationErrors(res, validation.error.errors)
        }
        const product = await Product.create({
            ...validation.data,
            user_id: req.user.id,
        })
        return res.json(product);

    }

    static async update(req: AccessRequest, res: Response) {
        const product = await ProductsController.getProduct(req, res)

        if (!(product instanceof Product))
            return product

        if (!product) {
            return res.status(404).json({message: 'Product does not exist'});
        }

        const validation = productSchema.safeParse(req.body)
        if (!validation.success) {
            return returnValidationErrors(res, validation.error.errors)
        }

        await product.update(validation.data)

        res.json({
            success: true,
            message: "Product updated successfully",
        })
    }

    static async delete(req: AccessRequest, res: Response) {
        const product = await ProductsController.getProduct(req, res)

        if (!(product instanceof Product))
            return product

        if (!product) {
            return res.status(404).json({message: 'Product does not exist'});
        }

        await product.destroy()

        return res.json({success: true, message: 'Role deleted successfully'});
    }
}