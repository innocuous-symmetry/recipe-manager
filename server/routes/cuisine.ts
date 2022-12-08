import { Express, Router } from 'express';
import { CuisineCtl } from '../controllers';
const CuisineInstance = new CuisineCtl();

const router = Router();

export const cuisineRouter = (app: Express) => {
    app.use('/cuisine', router);

    router.get('/', async (req, res, next) => {
        try {
            const result = await CuisineInstance.getAll();
            res.status(200).send(result);
        } catch(e) {
            next(e);
        }
    })

    router.get('/:id', async (req, res, next) => {
        const { id } = req.params;

        try {
            const result = await CuisineInstance.getOne(id);
            res.status(200).send(result);
        } catch(e) {
            next(e);
        }
    })

    router.post('/', async (req, res, next) => {
        const data = req.body;

        try {
            const result = await CuisineInstance.post(data);
            res.status(201).send(result);
        } catch(e) {
            next(e);
        }
    })
}