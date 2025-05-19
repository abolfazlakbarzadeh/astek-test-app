import {NextFunction, Response} from "express";
import {AuthRequest} from "./auth-middleware";
import {Role} from "../models/Role";
import {userForbidden} from "../misc/http-responses";

const unauthorizedError = (res: Response) => {
    return res.status(401).json({message: 'Unauthorized'});
}

export interface AccessRequest extends AuthRequest {}

export const accessMiddleware = (roles?: string[], permissions?: string[]): any => async (req: AccessRequest, res: Response, next: NextFunction) => {
    const user = req.user

    if (user.is_super_admin) {
        return next()
    }

    if (!roles && !permissions) {
        return unauthorizedError(res)
    }

    if (!user.role) {
        return userForbidden(res)
    }
    const role = await Role.findOne({
        where: {
            name: user.role
        }
    })
    if (!role) {
        return userForbidden(res)
    }

    let permission_grants = true
    if (permissions) {
        const rolePermissions = role.permissions
        permission_grants = permissions.some(permission => rolePermissions.includes(permission))
    }
    let role_grants = true
    if (roles) {
        role_grants = roles.some(role => role == user.role)
    }
    if (permission_grants && role_grants) {
        next();
    } else
        return userForbidden(res)
}