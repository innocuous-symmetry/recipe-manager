import { Express, Router } from "express";
const router = Router();

export const ingredientRoute = (app: Express) => {
    app.use('/ingredient', router);

    router.get('/', async (req, res, next) => {

    })

    router.get('/:id', async (req, res, next) => {

    })

    router.put('/:id', async (req, res, next) => {

    })

    router.post('/', async (req, res, next) => {
        
    })
}