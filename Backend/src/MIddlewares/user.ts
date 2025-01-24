import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
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
        // checking if the jwt is string or not
        if(typeof decoded === "string") {
            res.status(403).json({
                msg: "Wrong token!"
            })
            return;
        }
        req.userId = (decoded as JwtPayload).id;
        next();
    } else {
        res.status(403).json({
            msg: "You are not logged in"
        })
    }
}