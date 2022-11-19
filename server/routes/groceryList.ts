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
                const result = await groceryinstance.getByUserID(userid);
                res.status(200).send(result);
            } else {
                const result = await groceryinstance.getAll();
                res.status(200).send(result);
            }
        } catch(e) {
            next(e);
        }
    })

    router.get('/:id', async (req, res, next) => {
        const { id } = req.params;
        try {
            const result = await groceryinstance.getOne(id);
            res.status(200).send(result);
        } catch(e) {
            next(e);
        }
    })

    router.post('/', async (req, res, next) => {
        const data = req.body;
        try {
            const result = await groceryinstance.post(data);
            res.status(201).send(result);
        } catch(e) {
            next(e);
        }
    })

    router.put('/:id', async (req, res, next) => {
        const { id } = req.params;
        const data = req.body;

        try {
            const result = await groceryinstance.put(id, data);
            res.status(200).send(result);
        } catch(e) {
            next(e);
        }
    })
}