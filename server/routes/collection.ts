import { Express, Router } from "express";

const router = Router();

const collectionRoute = (app: Express) => {
    app.use('/collection', router);

    router.get('/:id', async (req, res, next) => {
        const { id } = req.params;
        try {
            
        } catch(e) {
            next(e);
        }
    })
}