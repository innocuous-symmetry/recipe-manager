import { Express, Router } from "express";
import { checkIsAdmin, restrictAccess } from "../auth/middlewares";
import CollectionCtl from "../controllers/CollectionCtl";
import { IUser } from "../schemas";
import { StatusCode } from "../util/types";
const CollectionInstance = new CollectionCtl();

const router = Router();

export const collectionRoute = (app: Express) => {
    app.use('/app/collection', router);

    router.get('/:id', restrictAccess, async (req, res, next) => {
        const { id } = req.params;
        const { getRecipes } = req.query;

        try {
            if (getRecipes || getRecipes == "true") {
                const { code, data } = await CollectionInstance.getRecipesFromOne(id);
                res.status(code).send(data);
            } else {
                const { code, data } = await CollectionInstance.getOne(id);
                res.status(code).send(data);
            }
        } catch(e) {
            next(e);
        }
    })

    // implement is admin on this route
    router.get('/', restrictAccess, async (req, res, next) => {
        const user = req.user as IUser;
        const { authored, authorID } = req.query;
        
        try {
            if (authorID) {
                const { code, data } = await CollectionInstance.getAllAuthored(parseInt(authorID as string));
                res.status(code).send(data);
            } else if (authored || authored == "true") {
                const { code, data } = await CollectionInstance.getAllAuthored(user.id as number);
                res.status(code).send(data);
            } else {
                if (user.isadmin) {
                    const { code, data } = await CollectionInstance.getAll();
                    res.status(code).send(data);
                } else {
                    res.status(403).send("Unauthorized");
                }
            }
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