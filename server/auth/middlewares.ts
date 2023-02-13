import { NextFunction, Request, Response } from "express"
import dotenv from "dotenv";
import { IUser } from "../schemas";

dotenv.config();

export function restrictAccess(req: Request, res: Response, next: NextFunction) {
    if (req.user == undefined) {
        res.send("content restricted");
    } else {
        next();
    }
}

export function requireSessionSecret(req: Request, res: Response, next: NextFunction) {
    const secret = process.env.SESSIONSECRET;

    if (!secret) {
        res.sendStatus(500);
        throw new Error("Express secret is undefined");
    } else {
        next();
    }
}

export function checkSubscription(req: Request, res: Response, next: NextFunction) {

}

export function checkFriendStatus(req: Request, res: Response, next: NextFunction) {

}

export function checkIsAdmin(req: Request, res: Response, next: NextFunction) {
    const user: IUser | undefined = req.user as IUser;

    if (user.isadmin) {
        next();
    } else {
        res.status(403).send("Unauthorized");
    }
}