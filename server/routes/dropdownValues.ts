import { Express, Router } from 'express';
import DropdownCtl from '../controllers/DropdownCtl';
import { DropdownDataType } from '../schemas';

const router = Router();
const DDInstance = new DropdownCtl();

export const dropdownValueRouter = (app: Express) => {
    app.use('/app/dropdown', router);

    router.get('/', async (req, res, next) => {
        const { datatype } = req.query;

        try {
            switch (datatype) {
                case "measurement":
                    const measurements = await DDInstance.getMeasurements();
                    res.status(measurements.code).send(measurements.data);
                    break;
                case "course":
                    const courses = await DDInstance.getCourses();
                    res.status(courses.code).send(courses.data);
                    break;
                default: break;
            }
        } catch (error) {
            next(error);
        }
    })

    return router;
}