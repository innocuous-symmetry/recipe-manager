import { Express, Router } from "express";
import { IngredientCtl } from "../controllers";
const IngredientInstance = new IngredientCtl();

const router = Router();

export const ingredientRoute = (app: Express) => {
    app.use('/ingredient', router);

    router.get('/', async (req, res, next) => {
        try {
            const result = await IngredientInstance.getAll();
            res.status(200).send(result);
        } catch(e) {
            next(e);
        }
    })

    router.get('/:id', async (req, res, next) => {
        const { id } = req.params;

        try {
            const result = await IngredientInstance.getOne(id);
            res.status(200).send(result);
        } catch(e) {
            next(e);
        }
    })

    router.put('/:id', async (req, res, next) => {
        const { id } = req.params;
        const data = req.body;

        try {
            const result = await IngredientInstance.put(id, data);
            res.status(200).send(result);
        } catch(e) {
            next(e);
        }
    })

    router.post('/', async (req, res, next) => {
        const data = req.body;

        try {
            const result = await IngredientInstance.post(data);
            res.status(201).send(result);
        } catch(e) {
            next(e);
        }
    })
}