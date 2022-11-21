import { Express } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import session from 'express-session';
import pgSessionStore from '../db/sessionStore';

export const expressLoader = async (app: Express) => {
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(morgan('tiny'));

    app.use(session({
        secret: process.env.SESSIONSECRET || "",
        cookie: {
            maxAge: 8 * 60 * 60 * 1000,
            secure: false
        },
        resave: false,
        saveUninitialized: false,
        store: pgSessionStore(session)
    }))

    return app;
}