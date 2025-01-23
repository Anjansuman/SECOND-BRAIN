import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "../config";

export const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers["authorization"];

    if(!header) {
        res.status(400).json({
            null: "header is null"
        })
    }
    const decoded = jwt.verify(header as string, JWT_PASSWORD);

    if(decoded) {
        // @ts-ignore
        // i have added ts-ignore but solve this problem
        req.userId = decoded.id;
        next();
    } else {
        res.status(403).json({
            msg: "You are not logged in"
        })
    }
}