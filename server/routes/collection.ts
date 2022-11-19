import { Express, Router } from "express";
import CollectionCtl from "../controllers/CollectionCtl";
const CollectionInstance = new CollectionCtl();

const router = Router();

export const collectionRoute = (app: Express) => {
    app.use('/collection', router);

    router.get('/:id', async (req, res, next) => {
        const { id } = req.params;
        try {
            const result = await CollectionInstance.getOne(id);
            res.status(200).send(result);
        } catch(e) {
            next(e);
        }
    })

    router.get('/', async (req, res, next) => {
        try {
            const result = await CollectionInstance.getAll();
            res.status(200).send(result);
        } catch(e) {
            next(e);
        }
    })

    router.post('/', async (req, res, next) => {
        const data = req.body;
        try {
            const result = await CollectionInstance.post(data);
            res.status(201).send(result);
        } catch(e) {
            next(e);
        }
    })
}