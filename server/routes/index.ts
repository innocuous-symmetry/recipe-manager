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
    userRoute(app);
    friendRouter(app);
    recipeRoute(app);
    ingredientRoute(app);
    
    // to do: refactor for ctlresponse
    authRoute(app, passport);
    collectionRoute(app);
    subscriptionRoute(app);
    groceryListRoute(app);
    courseRouter(app);

    // deprecate?
    cuisineRouter(app);
}