import {AccessRequest} from "./access-middleware";
import {NextFunction, Response} from "express";
import {userForbidden} from "../misc/http-responses";

export const selfMiddleware = (idField = 'id'): any => (req: AccessRequest, res: Response, next: NextFunction) => {
    if (req.user.id != req.params[idField] && !req.user.is_super_admin)
        return userForbidden(res)
    next()
}