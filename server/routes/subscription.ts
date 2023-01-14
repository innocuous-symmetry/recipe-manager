import { Express, Router } from "express"
import { restrictAccess } from "../auth/middlewares";
import { CollectionCtl } from "../controllers";
const CollectionInstance = new CollectionCtl();
const router = Router();

export const subscriptionRoute = (app: Express) => {
    app.use('/subscription', router);

    router.get('/', async (req, res, next) => {
        // @ts-ignore
        const { user } = req.session.user;
        if (!user) return;

        try {
            const result = await CollectionInstance.getSubscriptions(user.id as string);
            res.status(200).send(result);
        } catch(e) {
            next(e);
        }
    })

    router.post('/', restrictAccess, async (req, res, next) => {
        // @ts-ignore
        const { user } = req.session.user;
        const { collection } = req.query;

        try {
            const result = await CollectionInstance.postSubscription(collection as string, user.id as string);
            res.status(201).send(result);
        } catch(e) {
            next(e);
        }
    })

    router.put('/', async (req, res, next) => {
        
    })
}