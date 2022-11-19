import { Express } from "express"
import { userRoute } from "./users";
import { recipeRoute } from "./recipe";
import { collectionRoute } from "./collection";
import { ingredientRoute } from "./ingredient";

export const routes = (app: Express, passport?: any) => {
    console.log('routes called');

    userRoute(app);
    recipeRoute(app);
    collectionRoute(app);
    ingredientRoute(app);

    app.get('/hello', (req, res) => {
        res.send({ message: "hello from the server!!" });
    })
}