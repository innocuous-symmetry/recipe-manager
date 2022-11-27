import { Express, Router } from 'express';
import { restrictAccess } from '../auth/middlewares';
import { UserCtl } from '../controllers';

const UserInstance = new UserCtl();
const router = Router();

export const friendRouter = (app: Express) => {
    app.use('/friend', router);

    router.post('/:targetid', restrictAccess, async (req, res, next) => {
        const { user }: any = req.user;
        const { targetid } = req.params;

        try {
            const result = await UserInstance.addFriendship(user.id, targetid);
            res.status(200).send(result);
        } catch(e) {
            next(e);
        }
    })

    // get all friendships for a user
    router.get('/', async (req, res, next) => {
        const { user }: any = req.user;

        try {
            const result = await UserInstance.getFriends(user.id);
            res.status(200).send(result);
        } catch(e) {
            next(e);
        }
    })

    // get one friendship by its id
    router.get('/:id', async (req, res, next) => {
        const { id } = req.params;
        const { user }: any = req.user;

        try {
            const result = await UserInstance.getFriendshipByID(id, user.id);
            res.status(200).send(result);
        } catch(e) {
            next(e);
        }
    })

    // update a friendship by its id
    router.put('/:id', async (req, res, next) => {
        const data = req.body;
        const { id } = req.params;
        const { user }: any = req.user;

        try {
            const result = await UserInstance.updateFriendship(id, user.id, data);
            res.status(200).send(result);
        } catch(e) {
            next(e);
        }
    })
}