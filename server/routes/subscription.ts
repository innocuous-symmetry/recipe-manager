import { Express, Router } from "express"
import { restrictAccess } from "../auth/middlewares";
import { CollectionCtl } from "../controllers";
import { IUser } from "../schemas";
const CollectionInstance = new CollectionCtl();
const router = Router();

export const subscriptionRoute = (app: Express) => {
    app.use('/app/subscription', router);

    router.get('/', async (req, res, next) => {
        const user = req.user as IUser;
        if (!user) return;

        try {
            const result = await CollectionInstance.getSubscriptions(user.id!);
            res.status(200).send(result);
        } catch(e) {
            next(e);
        }
    })

    router.post('/', restrictAccess, async (req, res, next) => {
        const user = req.user as IUser;
        const { collection } = req.query;

        try {
            const result = await CollectionInstance.postSubscription(collection as string, user.id!);
            res.status(201).send(result);
        } catch(e) {
            next(e);
        }
    })

    router.put('/', async (req, res, next) => {
        
    })
}