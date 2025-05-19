import {Response} from "express";
import {z} from "zod";

export const userForbidden = (res:Response) => {
    return res.status(403).json({
        error: "You don't have permission to perform this action",
    })
}

export const returnValidationErrors = (res: Response, errors: z.ZodIssue[]) => {
    return res.status(400).json({
        error: "data validation failed",
        messages: errors
    })
}