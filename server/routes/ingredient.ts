import { Express, Router } from "express";
import { IngredientCtl } from "../controllers";
import { IIngredient } from "../schemas";
import { CtlResponse } from "../util/types";
const IngredientInstance = new IngredientCtl();

const router = Router();

export const ingredientRoute = (app: Express) => {
    app.use('/app/ingredient', router);

    router.get('/', async (req, res, next) => {
        try {
            const result: CtlResponse<IIngredient[] | string> = await IngredientInstance.getAll();
            res.status(result.code).send(result.data);
        } catch(e) {
            next(e);
        }
    })

    router.get('/:id', async (req, res, next) => {
        const { id } = req.params;

        try {
            const result: CtlResponse<IIngredient | string> = await IngredientInstance.getOne(id);
            res.status(result.code).send(result.data);
        } catch(e) {
            next(e);
        }
    })

    router.put('/:id', async (req, res, next) => {
        const { id } = req.params;
        const data = req.body;

        try {
            const result: CtlResponse<IIngredient | string> = await IngredientInstance.put(id, data);
            res.status(result.code).send(result.data);
        } catch(e) {
            next(e);
        }
    })

    router.post('/', async (req, res, next) => {
        const data = req.body;

        try {
            const result: CtlResponse<IIngredient | string> = await IngredientInstance.post(data);
            res.status(result.code).send(result.data);
        } catch(e) {
            next(e);
        }
    })
}