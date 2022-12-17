import { Express, Router } from 'express';
import { CourseCtl } from '../controllers';
const CourseInstance = new CourseCtl();
const router = Router();

export const courseRouter = (app: Express) => {
    app.use('/course', router);

    router.get('/', async (req, res, next) => {
        try {
            const { code, data } = await CourseInstance.getAll();
            res.status(code).send(data);
        } catch(e) {
            next(e);
        }
    })

    router.get('/:id', async (req, res, next) => {
        const { id } = req.params;

        try {
            const { code, data } = await CourseInstance.getOne(id);
            res.status(code).send(data);
        } catch(e) {
            next(e);
        }
    })

    router.post('/', async (req, res, next) => {
        const data = req.body;

        try {
            const result = await CourseInstance.post(data);
            res.status(result.code).send(result.data);
        } catch(e) {
            next(e);
        }
    })
}