import { Express, Router } from 'express';
import UserCtl from '../controllers/UserCtl';
const router = Router();
const userCtl = new UserCtl();

export const userRoute = (app: Express) => {
    app.use('/users', router);

    // get all users
    router.get('/', async (req, res) => {
        const data = await userCtl.getAll();
        res.status(200).send(data);
    })

    router.get('/:id', async (req, res, next) => {
        const { id } = req.params;
        try {
            const result = await userCtl.getOne(id);
            res.status(200).send(result);
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

    router.post('/', async (req, res) => {
        const data = req.body;
        const response = userCtl.post(data);
        res.status(200).send(response);
    })

    router.get('/hidden-thing', (req, res) => {
        res.send('does this route actually work?');
    })
}