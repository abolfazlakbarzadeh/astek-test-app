import {Response} from "express";

export const userForbidden = (res:Response) => {
    return res.status(403).json({
        error: "You don't have permission to perform this action",
    })
}