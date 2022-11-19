import { Express, Router } from 'express';
import UserCtl from '../controllers/UserCtl';
const router = Router();
const userCtl = new UserCtl();

export const userRoute = (app: Express) => {
    app.use('/users', router);

    // get all users
    router.get('/', async (req, res) => {
        const data = userCtl.getAll();
        res.status(200).send(data);
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