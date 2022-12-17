import { NextFunction, Request, Response } from "express"
import { StatusCode } from "../util/types";

export function restrictAccess(req: Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(StatusCode.Forbidden).send({ ok: false, user: undefined })
    }
}

export function checkSubscription(req: Request, res: Response, next: NextFunction) {

}

export function checkFriendStatus(req: Request, res: Response, next: NextFunction) {

}

export function checkIsAdmin(req: Request, res: Response, next: NextFunction) {
    
}