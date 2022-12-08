import { Express } from "express"
import { PassportStatic } from "passport";
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

export const routes = async (app: Express, passport: PassportStatic) => {
    console.log('routes called');

    authRoute(app, passport);
    userRoute(app);
    friendRouter(app);
    cuisineRouter(app);
    courseRouter(app);
    recipeRoute(app);
    collectionRoute(app);
    subscriptionRoute(app);
    ingredientRoute(app);
    groceryListRoute(app);
}