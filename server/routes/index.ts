import { Express } from "express"
import { userRoute } from "./users";

export const routes = (app: Express, passport?: any) => {
    console.log('routes called');

    userRoute(app);

    app.get('/hello', (req, res) => {
        res.send({ message: "hello from the server!!" });
    })
}