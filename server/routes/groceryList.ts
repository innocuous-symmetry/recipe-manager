import { Express, Router } from "express";
import { GroceryListCtl } from "../controllers";
const groceryinstance = new GroceryListCtl();

const router = Router();

export const groceryListRoute = (app: Express) => {
    app.use('/grocery-list', router);

    router.get('/', async (req, res, next) => {
        const userid = req.query.userid as string;

        try {
            if (userid) {
                const { code, data } = await groceryinstance.getByUserID(userid);
                res.status(code).send(data);
            } else {
                const { code, data } = await groceryinstance.getAll();
                res.status(code).send(data);
            }
        } catch(e) {
            next(e);
        }
    })

    router.get('/:id', async (req, res, next) => {
        const { id } = req.params;
        try {
            const { code, data } = await groceryinstance.getOne(id);
            res.status(code).send(data);
        } catch(e) {
            next(e);
        }
    })

    router.post('/', async (req, res, next) => {
        const data = req.body;
        try {
            const result = await groceryinstance.post(data);
            res.status(result.code).send(result.data);
        } catch(e) {
            next(e);
        }
    })

    router.put('/:id', async (req, res, next) => {
        const { id } = req.params;
        const data = req.body;

        try {
            const result = await groceryinstance.put(id, data);
            res.status(result.code).send(result.data);
        } catch(e) {
            next(e);
        }
    })
}