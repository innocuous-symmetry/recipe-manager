import { Express, Router } from 'express';
import { restrictAccess } from '../auth/middlewares';
import { UserCtl } from '../controllers';
import { IUser } from '../schemas';

const UserInstance = new UserCtl();
const router = Router();

export const friendRouter = (app: Express) => {
    app.use('/app/friend', router);

    router.post('/:targetid', restrictAccess, async (req, res, next) => {
        const user = req.user as IUser;
        const { targetid } = req.params;

        try {
            const { code, data } = await UserInstance.addFriendship(user.id as number, targetid);
            res.status(code).send(data);
        } catch(e) {
            next(e);
        }
    })

    // get all friendships for a user
    router.get('/', async (req, res, next) => {
        const user = req.user as IUser;
        const { pending, targetUser } = req.query;

        try {
            if (pending) {
                const { code, data } = await UserInstance.getPendingFriendRequests(user.id as number);
                res.status(code).send(data);
            } else {
                if (targetUser) {
                    const { code, data } = await UserInstance.getFriends(parseInt(targetUser as string));
                    res.status(code).send(data);
                } else {
                    const { code, data } = await UserInstance.getFriends(user.id as number);
                    res.status(code).send(data);
                }
            }
        } catch(e) {
            next(e);
        }
    })

    // get one friendship by its id
    router.get('/:id', async (req, res, next) => {
        const { id } = req.params;
        const user = req.user as IUser;

        try {
            const { code, data } = await UserInstance.getFriendshipByID(id, user.id as number);
            res.status(code).send(data);
        } catch(e) {
            next(e);
        }
    })

    /**
     * Update friendship by friendship ID
     * allows user who received a friend request to confirm it
     * expects body schema of:
     *     active: boolean
     *     pending: boolean
     *     dateterminated: string | null
     * receives friendship ID from req.params and checks
     * against current user ID from session
     */
    router.put('/:id', async (req, res, next) => {
        const data = req.body;
        const { id } = req.params;
        const user = req.user as IUser;

        try {
            const response = await UserInstance.updateFriendship(id, user.id as number, data);
            res.status(response.code).send(response.data);
        } catch(e) {
            next(e);
        }
    })

    return router;
}