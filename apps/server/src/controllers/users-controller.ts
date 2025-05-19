import {Request, Response} from "express";
import {User} from "../models/User";
import {permissions, userCreateSchema, userEditSchema} from "validation";
import {z} from "zod";
import bcrypt from "bcryptjs";
import {Role} from "../models/Role";
import {userForbidden} from "../misc/http-responses";
import {AccessRequest} from "../middlewares/access-middleware";

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
        const authUser = req.user
        if (authUser.id != req.params.id && !authUser.is_super_admin) {
            return userForbidden(res)
        }
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
        const validation = userCreateSchema.superRefine((data, ctx) => {
            if (!data.is_super_admin && !data.role) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Role is required when not a super admin",
                    path: ["role"],
                });
            }
        }).safeParse(req.body)
        if (!validation.success) {
            return res.status(400).json({
                error: "data validation failed",
                messages: validation.error.errors
            })
        }
        const password = bcrypt.hashSync(validation.data.password!, 10)
        const user = await User.create({
            ...validation.data,
            password
        })
        return res.json(user);
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
        console.log({
            validation
        })
        if (!validation.success) {
            return res.status(400).json({
                error: "data validation failed",
                messages: validation.error.errors
            })
        }
        if (user.is_super_admin != validation.data.is_super_admin && !authUser.is_super_admin) {
            return userForbidden(res)
        }
        if (user.role != validation.data.role && !authUser.is_super_admin) {
            // check if the user has assign role permission
            const role = await Role.findOne({
                where: {
                    name: authUser.role
                }
            })
            if (!role) {
                return userForbidden(res)
            }
            const rolePermissions = JSON.parse(role.permissions) as string[]
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
}