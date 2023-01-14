import e, { NextFunction, Request, Response } from "express"
import ControllerResponse from "../util/ControllerResponse";
import { StatusCode } from "../util/types";

export function restrictAccess(req: Request, res: Response, next: NextFunction) {
    if (req.session.user == undefined) {
        console.log("restricted")
        res.send(undefined);
    } else {
        next();
    }
}

export function checkSubscription(req: Request, res: Response, next: NextFunction) {

}

export function checkFriendStatus(req: Request, res: Response, next: NextFunction) {

}

export function checkIsAdmin(req: Request, res: Response, next: NextFunction) {
    
}