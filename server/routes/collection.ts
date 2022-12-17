import { Express, Router } from "express";
import { restrictAccess } from "../auth/middlewares";
import CollectionCtl from "../controllers/CollectionCtl";
const CollectionInstance = new CollectionCtl();

const router = Router();

export const collectionRoute = (app: Express) => {
    app.use('/collection', router);

    router.get('/:id', restrictAccess, async (req, res, next) => {
        const { id } = req.params;
        try {
            const { code, data } = await CollectionInstance.getOne(id);
            res.status(code).send(data);
        } catch(e) {
            next(e);
        }
    })

    // implement is admin on this route
    router.get('/', restrictAccess, async (req, res, next) => {
        try {
            const { code, data } = await CollectionInstance.getAll();
            res.status(code).send(data);
        } catch(e) {
            next(e);
        }
    })

    router.post('/', restrictAccess, async (req, res, next) => {
        const data = req.body;
        try {
            const result = await CollectionInstance.post(data);
            res.status(result.code).send(result.data);
        } catch(e) {
            next(e);
        }
    })

    // router.get('/subscriptions', restrictAccess, async (req, res, next) => {
    //     res.send('sanity check');
    //     // // @ts-ignore
    //     // const { user } = req.user;
    //     // if (!user) return;

    //     // try {
    //     //     const result = await CollectionInstance.getSubscriptions("9");
    //     //     res.status(200).send(result);
    //     // } catch(e) {
    //     //     next(e);
    //     // }
    // })

    // router.post('/subscribe', restrictAccess, async (req, res, next) => {
    //     // @ts-ignore
    //     const { user } = req.user;
    //     const { collection } = req.query;

    //     try {
    //         const result = await CollectionInstance.postSubscription(collection as string, user.id as string);
    //         res.status(201).send(result);
    //     } catch(e) {
    //         next(e);
    //     }
    // })
}