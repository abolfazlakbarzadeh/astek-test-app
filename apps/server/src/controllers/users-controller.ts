import {Request, Response} from "express";
import {User} from "../models/User";
import {userCreateSchema} from "validation";
import {z} from "zod";
import bcrypt from "bcryptjs";
import {AuthRequest} from "../middlewares/auth-middleware";

export class UsersController {
    static async index(req: Request, res: Response) {
        const users = await User.findAll({
            attributes: {
                exclude: ['password'],
            }
        })


        return res.json(users);
    }

    static async get(req: Request, res: Response) {
        const user = await User.findOne({
            where: {
                id: req.params.id
            },
            attributes: {
                exclude: ['password'],
            }
        })


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

    static async update(req: AuthRequest, res: Response) {

    }
}