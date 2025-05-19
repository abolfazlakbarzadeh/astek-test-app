import {Request, Response} from "express";
import {roleSchema} from "validation";
import {Role} from "../models/Role";
import {AccessRequest} from "../middlewares/access-middleware";
import {returnValidationErrors} from "../misc/http-responses";
import {Error} from "sequelize";

export class RolesController {
    static async index(req: Request, res: Response) {
        const roles = await Role.findAll()
        return res.json(roles);
    }

    static async get(req: AccessRequest, res: Response) {
        const role = await Role.findOne({
            where: {
                id: req.params.id
            },
        })

        if (!role) {
            return res.status(404).json({message: 'Role does not exist'});
        }

        return res.json(role);
    }

    static async create(req: Request, res: Response) {
        const validation = roleSchema.safeParse(req.body)
        if (!validation.success) {
            return returnValidationErrors(res, validation.error.errors)
        }
        try {
            const role = await Role.create(validation.data)
            return res.json(role);
        } catch (e) {
            const error = e as Error
            if (error.name == "SequelizeUniqueConstraintError") {
                return res.status(400).json({
                    success: false,
                    message: 'Role already exists'
                })
            }
        }
    }

    static async update(req: AccessRequest, res: Response) {
        const role = await Role.findOne({
            where: {
                id: req.params.id
            }
        })
        if (!role) {
            return res.status(404).json({message: 'Role does not exist'});
        }

        const validation = roleSchema.safeParse(req.body)
        if (!validation.success) {
            return returnValidationErrors(res, validation.error.errors)
        }

        await role.update(validation.data)

        res.json({
            success: true,
            message: "Role updated successfully",
        })
    }

    static async delete(req: AccessRequest, res: Response) {
        const role = await Role.findOne({
            where: {
                id: req.params.id
            }
        })

        if (!role) {
            return res.status(404).json({message: 'Role does not exist'});
        }

        await role.destroy()

        return res.json({success: true, message: 'Role deleted successfully'});
    }
}