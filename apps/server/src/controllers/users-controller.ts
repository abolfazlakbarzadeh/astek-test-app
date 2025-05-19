import {Request, Response} from "express";
import {User} from "../models/User";
import {permissions, userAssignRoleSchema, userEditSchema, userSchema} from "validation";
import bcrypt from "bcryptjs";
import {Role} from "../models/Role";
import {returnValidationErrors, userForbidden} from "../misc/http-responses";
import {AccessRequest} from "../middlewares/access-middleware";
import {Error} from "sequelize";

export class UsersController {
    static async index(req: Request, res: Response) {
        const users = await User.findAll({
            attributes: {
                exclude: ['password'],
            }
        })


        return res.json(users);
    }

    static async get(req: AccessRequest, res: Response) {
        const user = await User.findOne({
            where: {
                id: req.params.id
            },
            attributes: {
                exclude: ['password'],
            }
        })

        if (!user) {
            return res.status(404).json({message: 'User does not exist'});
        }

        return res.json(user);
    }

    static async create(req: Request, res: Response) {
        const validation = userSchema.safeParse(req.body)
        if (!validation.success) {
            return returnValidationErrors(res, validation.error.errors)
        }
        const password = bcrypt.hashSync(validation.data.password!, 10)
        try {
            const user = await User.create({
                ...validation.data,
                password
            })
            return res.json(user);
        } catch (e) {
            const error = e as Error
            if (error.name == "SequelizeUniqueConstraintError") {
                return res.status(400).json({
                    success: false,
                    message: 'User already exists'
                })
            }
        }
    }

    static async update(req: AccessRequest, res: Response) {
        const authUser = req.user
        const user = await User.findOne({
            where: {
                id: req.params.id
            }
        })
        if (!user) {
            return res.status(404).json({message: 'User does not exist'});
        }

        const validation = userEditSchema.safeParse(req.body)
        if (!validation.success) {
            return returnValidationErrors(res, validation.error.errors)
        }
        if (user.is_super_admin != validation.data.is_super_admin && !authUser.is_super_admin) {
            return userForbidden(res)
        }
        if (user.role_id != validation.data.role_id! && !authUser.is_super_admin) {
            // check if the user has assign role permission
            const role = await Role.findOne({
                where: {
                    id: authUser.role_id
                }
            })
            if (!role) {
                return res.status(404).json({message: 'Role does not exist'});
            }
            const rolePermissions = role.permissions
            if (!rolePermissions.some(permission => permission == permissions.account_management.assignRole)) {
                return userForbidden(res)
            }
        }
        const {password: _, ...payloadData} = validation.data
        let password;
        if (validation.data.password) {
            password = bcrypt.hashSync(validation.data.password!, 10)
        }
        await user.update({...payloadData, password})

        res.json({
            success: true,
            message: "User updated successfully",
        })
    }

    static async delete(req: AccessRequest, res: Response) {
        if (req.user.id == req.params.id) {
            return userForbidden(res)
        }
        const user = await User.findOne({
            where: {
                id: req.params.id
            }
        })

        if (!user) {
            return res.status(404).json({message: 'User does not exist'});
        }

        await user.destroy()

        return res.json({success: true, message: 'User deleted successfully'});
    }

    static async assignRole(req: AccessRequest, res: Response) {

        const validation = userAssignRoleSchema.safeParse(req.body)
        if (!validation.success) {
            return returnValidationErrors(res, validation.error.errors)
        }

        const user = await User.findOne({
            where: {
                id: req.params.id
            }
        })

        if (!user) {
            return res.status(404).json({message: 'User does not exist'});
        }

        const role = await Role.findOne({
            where: {
                id: validation.data.role_id
            }
        })
        if (!role) {
            return res.status(404).json({message: 'Role does not exist'});
        }

        await user.setRole(role)

        return res.json({success: true, message: 'User role assigned successfully'});
    }
}