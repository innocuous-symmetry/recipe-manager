import { Express } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

export const expressLoader = (app: Express) => {
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // app.use(session({}))

    return app;
}