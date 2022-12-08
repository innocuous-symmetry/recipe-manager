import { Express, Router } from 'express';
import { CourseCtl } from '../controllers';
const CourseInstance = new CourseCtl();
const router = Router();

export const courseRouter = (app: Express) => {
    app.use('/course', router);

    router.get('/', async (req, res, next) => {
        try {
            const result = await CourseInstance.getAll();
            res.status(200).send(result);
        } catch(e) {
            next(e);
        }
    })

    router.get('/:id', async (req, res, next) => {
        const { id } = req.params;

        try {
            const result = await CourseInstance.getOne(id);
            res.status(200).send(result);
        } catch(e) {
            next(e);
        }
    })

    router.post('/', async (req, res, next) => {
        const data = req.body;

        try {
            const result = await CourseInstance.post(data);
            res.status(201).send(result);
        } catch(e) {
            next(e);
        }
    })
}