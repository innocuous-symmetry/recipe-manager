import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import { Express } from "express"
import { userRoute } from "./users";
import { recipeRoute } from "./recipe";
import { collectionRoute } from "./collection";
import { ingredientRoute } from "./ingredient";
import { groceryListRoute } from "./groceryList";
import { authRoute } from "./auth";
import { subscriptionRoute } from "./subscription";
import { friendRouter } from "./friend";
import { cuisineRouter } from "./cuisine";
import { courseRouter } from "./course";
import { dropdownValueRouter } from "./dropdownValues";
import { IUser } from "../schemas";
import { User } from "../models/user";

dotenv.config();

let REQUESTCOUNT = 0;

export const routes = async (app: Express) => {
    // simple request counting middleware
    app.use('/', (req, res, next) => {
        REQUESTCOUNT++;
        console.log("count: ", REQUESTCOUNT);
        next();
    })
    
    // middleware to check for auth on cookies on each request in protected routes
    app.use('/app', async (req, res, next) => {
        // pull jwt from request headers
        const token = req.headers['authorization']?.split(" ")[1];

        if (!token) {
            res.status(403).send("Unauthorized, did not receive token");
        } else {
            jwt.verify(token, process.env.SESSIONSECRET as string, async (err, data: any) => {
                if (err) {
                    res.status(403).send(err);
                } else {
                    const userInstance = new User();
                    const foundUser = await userInstance.getOneByID(data.user.id);

                    if (foundUser) {
                        req.user = data.user as IUser;
                    } else {
                        res.status(403).send("Unauthorized, user not registered");
                    }

                    next();
                }
            })
        }
    })

    // unprotected routes
    authRoute(app);

    // protected routes
    userRoute(app);
    friendRouter(app);
    recipeRoute(app);
    ingredientRoute(app);
    collectionRoute(app);
    subscriptionRoute(app);
    groceryListRoute(app);
    courseRouter(app);
    dropdownValueRouter(app);

    // deprecate?
    cuisineRouter(app);
}