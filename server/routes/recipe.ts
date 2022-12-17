import { Express, Router } from "express"
import { restrictAccess } from "../auth/middlewares";
import RecipeCtl from "../controllers/RecipeCtl";
import { IRecipe } from "../schemas";
import { CtlResponse } from "../util/types";
const recipectl = new RecipeCtl();

const router = Router();

export const recipeRoute = (app: Express) => {
    app.use('/recipe', router);

    router.get('/:id', async (req, res, next) => {
        const { id } = req.params;

        try {
            const { code, data } = await recipectl.getOne(id);
            res.status(code).send(data);
        } catch(e) {
            next(e);
        }
    })

    router.get('/', restrictAccess, async (req, res, next) => {
        const { user }: any = req.user;
        const { filterby } = req.query;

        try {
            let result: CtlResponse<IRecipe[] | string>;
            switch (filterby) {
                case "allaccessible":
                    // result = await recipectl.getAllAccessible(user.id);
                    // break;
                default:
                    result = await recipectl.getAllAuthored(user.id);
                    break;
            }

            res.status(result.code).send(result.data);
        } catch(e) {
            next(e);
        }
    })

    router.put('/:id', async (req, res, next) => {
        const data = req.body;
        const { id } = req.params;

        try {
            const result: CtlResponse<IRecipe | string> = await recipectl.updateOne(id, data);
            res.status(result.code).send(result.data);
        } catch(e) {
            next(e);
        }
    })

    router.post('/', restrictAccess, async (req, res, next) => {
        const { user }: any = req.user;
        const data = req.body;

        try {
            const result = await recipectl.post(user.id, data);
            res.status(result.code).send(result.data);
        } catch(e) {
            next(e);
        }
    })
}