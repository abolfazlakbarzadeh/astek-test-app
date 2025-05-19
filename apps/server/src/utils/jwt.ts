import jwt from 'jsonwebtoken';
import type {StringValue} from "ms";

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret'; // use env in prod

export const generateToken = (payload: object, expiresIn: StringValue = '1h') => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn });
};

export const verifyToken = (token: string) => {
    return jwt.verify(token, JWT_SECRET);
};
