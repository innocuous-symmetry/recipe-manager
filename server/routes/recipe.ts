import { Express, Router } from "express"
import { restrictAccess } from "../auth/middlewares";
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

    router.get('/', async (req, res, next) => {
        const { user }: any = req.user;
        const { filterby } = req.query;

        try {
            let result;
            switch (filterby) {
                case "allaccessible":
                    result = await recipectl.getAllAccessible(user.id);
                    break;
                default:
                    result = await recipectl.getAllAuthored(user.id);
                    break;
            }

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

    router.post('/', restrictAccess, async (req, res, next) => {
        const { user }: any = req.user;
        const data = req.body;

        try {
            const result = await recipectl.post(user.id, data);
            res.status(201).send(result);
        } catch(e) {
            next(e);
        }
    })
}