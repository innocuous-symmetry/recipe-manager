import { Express, Router } from "express"
import { restrictAccess } from "../auth/middlewares";
import RecipeCtl from "../controllers/RecipeCtl";
import { IRecipe, IUser } from "../schemas";
import { CtlResponse } from "../util/types";
const recipectl = new RecipeCtl();

const router = Router();

export const recipeRoute = (app: Express) => {
    app.use('/app/recipe', router);

    router.get('/:id', async (req, res, next) => {
        const { id } = req.params;

        try {
            const { code, data } = await recipectl.getOne(parseInt(id));
            res.status(code).send(data);
        } catch(e) {
            next(e);
        }
    })

    router.get('/', restrictAccess, async (req, res, next) => {
        const user = req.session.user as IUser;
        const { filterby } = req.query;

        try {
            let result: CtlResponse<IRecipe[] | string>;
            switch (filterby) {
                case "myrecipes":
                    result = await recipectl.getAllAuthored(user.id as number);
                    break;
                default:
                    result = await recipectl.getAllAccessible(user.id as number);
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
            const result: CtlResponse<IRecipe | string> = await recipectl.updateOne(parseInt(id), data);
            res.status(result.code).send(result.data);
        } catch(e) {
            next(e);
        }
    })

    router.post('/', restrictAccess, async (req, res, next) => {
        const user = req.session.user as IUser;
        const data = req.body;

        try {
            const result = await recipectl.post(user.id as number, data);
            res.status(result.code).send(result.data);
        } catch(e) {
            next(e);
        }
    })
}