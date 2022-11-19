import { Express, Router } from "express"
import RecipeCtl from "../controllers/RecipeCtl";
const recipectl = new RecipeCtl();

const router = Router();

export const recipeRoute = (app: Express) => {
    app.use('/recipe', router);

    router.get('/:id', async (req, res, next) => {
        const { id } = req.params;

        try {
            const result = await recipectl.getOne(id);
            res.status(200).send(result);
        } catch(e) {
            next(e);
        }
    })

    router.put('/:id', async (req, res, next) => {
        const data = req.body;
        const { id } = req.params;

        try {
            const result = await recipectl.updateOne(id, data);
            res.status(200).send(result);
        } catch(e) {
            next(e);
        }
    })

    router.post('/', async (req, res, next) => {
        const data = req.body;
        console.log(data);

        try {
            const result = await recipectl.post(data);
            res.status(201).send(result);
        } catch(e) {
            next(e);
        }
    })
}