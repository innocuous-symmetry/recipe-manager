import { Express, Router } from "express";
import { GroceryListCtl } from "../controllers";

const router = Router();

export const groceryListRoute = (app: Express) => {
    app.use('/grocery-list', router);

    router.get('/', async (req, res, next) => {

    })

    router.get('/:id', async (req, res, next) => {

    })

    router.post('/', async (req, res, next) => {

    })

    router.put('/:id', async (req, res, next) => {

    })
}