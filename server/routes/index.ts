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

dotenv.config();

export const routes = async (app: Express) => {
    // unprotected routes
    authRoute(app);

    // middleware to check for auth on cookies on each request in protected routes
    app.use('/app', async (req, res, next) => {
        // pull jwt from request headers
        const token = req.headers['authorization']?.split(" ")[1];

        if (!token) {
            res.status(403).send("Unauthorized, did not receive token");
        } else {
            jwt.verify(token, process.env.SESSIONSECRET as string, (err, data) => {
                if (err) {
                    res.status(403).send(err);
                } else {
                    // @ts-ignore
                    req.user = data.user;
                    next();
                }
            })
        }
    })

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