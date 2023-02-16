import { Express, Router } from 'express';
import DropdownCtl from '../controllers/DropdownCtl';
import { DropdownDataType } from '../schemas';

const router = Router();
const DDInstance = new DropdownCtl();

export const dropdownValue = (app: Express) => {
    app.use('/app/dropdown', router);

    router.get('/', async (req, res, next) => {
        const { datatype } = req.query;

        try {
            switch (datatype) {
                case "measurement":
                    const { code, data } = await DDInstance.getMeasurements();
                    res.status(code).send(data);
                    break;
                default: break;
            }
        } catch (error) {
            next(error);
        }
    })

}