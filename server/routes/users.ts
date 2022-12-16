import { Express, Router } from 'express';
import UserCtl from '../controllers/UserCtl';
import { IUser } from '../schemas';
import { CtlResponse } from '../util/types';
const router = Router();
const userCtl = new UserCtl();

export const userRoute = (app: Express) => {
    app.use('/users', router);

    // get all users
    router.get('/', async (req, res) => {
        const result: CtlResponse<IUser[] | string> = await userCtl.getAll();
        res.status(result.code).send(result.data);
    })

    // get, put by id
    router.get('/:userid', async (req, res, next) => {
        const { userid } = req.params;
        try {
            const result: CtlResponse<IUser | string> = await userCtl.getOne(userid);
            if (result.ok) {
                const { email, id, firstname, lastname, handle } = result.data as IUser;
                res.status(result.code).send({
                    id: id,
                    email: email,
                    firstname: firstname,
                    lastname: lastname,
                    handle: handle
                });
            } else {
                res.status(result.code).send(result.data as string);
            }
        } catch(e) {
            next(e);
        }
    })

    router.put('/:id', async (req, res, next) => {
        const { id } = req.params;
        const data = req.body;
        try {
            const result = await userCtl.updateOne(id, data);
            res.status(200).send(result);
        } catch(e) {
            next(e);
        }
    })

    // create user
    router.post('/', async (req, res) => {
        const data = req.body;
        const response = await userCtl.post(data);
        res.status(response.code).send(response.data);
    })

    // get friendships by requester ID
    router.get('/friends/:id', async (req, res, next) => {
        const { id } = req.params;
        try {
            const result = await userCtl.getFriends(id);
            res.status(200).send(result);
        } catch(e) {
            next(e);
        }
    })
}