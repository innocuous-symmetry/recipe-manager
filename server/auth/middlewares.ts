import { NextFunction, Request, Response } from "express"

export function restrictAccess(req: Request, res: Response, next: NextFunction) {
    if (!req.isAuthenticated()) {
        res.status(403).send({ message: "Access forbidden" });
    } else {
        next();
    }
}

export function checkAccess(req: Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(403).send({ message: "Access forbidden" });
    }
}