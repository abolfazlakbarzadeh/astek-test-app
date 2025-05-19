import {NextFunction, Request, Response} from "express";
import {AuthRequest} from "./auth-middleware";
import {Role} from "../models/Role";

const unauthorizedError = (res: Response) => {
    return res.status(401).json({message: 'Unauthorized'});
}

export const accessMiddleware = (roles?: string[], permissions?: string[]): any => async (req: AuthRequest, res: Response, next: NextFunction) => {
    const user = req.user

    if (!roles && !permissions) {
        if (!user.is_super_admin)
            return unauthorizedError(res)
        else return next()
    }

    if (!user.role) {
        return unauthorizedError(res)
    }
    const role = await Role.findOne({
        where: {
            name: user.role
        }
    })
    if (!role) {
        return unauthorizedError(res)
    }

    let permission_grants = true
    if (permissions) {
        const rolePermissions = JSON.parse(role.permissions) as string[]
        permission_grants = permissions.some(permission => rolePermissions.includes(permission))
    }
    let role_grants = true
    if (roles) {
        role_grants = roles.some(role => role == user.role)
    }

    if (permission_grants && role_grants)
        next()
    else
        return unauthorizedError(res)
}