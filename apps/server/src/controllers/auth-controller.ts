import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/jwt';
import {User} from "../models/User";

export class AuthController {
    static async login(req: Request, res: Response) {
        const { username, password } = req.body;

        const user = await User.findOne({ where: { username } });

        if (!user) {
            return res.status(404).json({message: 'User does not exist'});
        }

        if (username !== user.username || !bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = generateToken({ id: user.id, username: user.username, role: user.role, is_super_admin: user.is_super_admin });

        res.json({ token });
    }
}