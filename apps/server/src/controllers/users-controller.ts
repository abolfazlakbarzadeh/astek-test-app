import {Request, Response} from "express";
import {User} from "../models/User";

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
}