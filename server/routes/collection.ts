import { Express, Router } from "express";
import { checkIsAdmin, restrictAccess } from "../auth/middlewares";
import CollectionCtl from "../controllers/CollectionCtl";
import { IUser } from "../schemas";
const CollectionInstance = new CollectionCtl();

const router = Router();

export const collectionRoute = (app: Express) => {
    app.use('/app/collection', router);

    router.get('/:id', async (req, res, next) => {
        const { id } = req.params;
        try {
            const { code, data } = await CollectionInstance.getOne(id);
            res.status(code).send(data);
        } catch(e) {
            next(e);
        }
    })

    router.get('&authored=true', restrictAccess, async (req, res, next) => {
        const user = req.user as IUser;
        console.log(user.id);
        try {
            const { code, data } = await CollectionInstance.getAllAuthored(user.id as number);
            res.status(code).send(data);
        } catch (e) {
            next(e);
        }
    })

    // implement is admin on this route
    router.get('/', restrictAccess, async (req, res, next) => {
        const user = req.user as IUser;
        const { authored } = req.query;
        
        try {
            if (authored || authored == "true") {
                const { code, data } = await CollectionInstance.getAllAuthored(user.id as number);
                res.status(code).send(data);
            } else {
                if (user.isadmin) {
                    const { code, data } = await CollectionInstance.getAll();
                    res.status(code).send(data);
                }
            }
        } catch(e) {
            next(e);
        }
    })

    router.post('/', async (req, res, next) => {
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
    //     // const { user } = req.session.user;
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
    //     const { user } = req.session.user;
    //     const { collection } = req.query;

    //     try {
    //         const result = await CollectionInstance.postSubscription(collection as string, user.id as string);
    //         res.status(201).send(result);
    //     } catch(e) {
    //         next(e);
    //     }
    // })
}