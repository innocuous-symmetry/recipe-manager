import { Express, Router } from "express"
const router = Router();

export const commentRoute = (app: Express) => {
    app.use('/comment', router);
}