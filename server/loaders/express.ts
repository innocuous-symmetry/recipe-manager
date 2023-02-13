import express, { Express } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import session from 'express-session';
import pgSessionStore from '../db/sessionStore';
import { IUser } from '../schemas';
import { requireSessionSecret } from '../auth/middlewares';

const origin = process.env.ORIGIN || 'http://localhost:5173';
const secret = process.env.SESSIONSECRET;

declare module 'express-session' {
    interface SessionData {
        user?: IUser
    }
}

export const expressLoader = async (app: Express) => {
    app.use(cors({ origin: origin }));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(morgan('tiny'));
    app.use(requireSessionSecret);

    app.use(session({
        secret: secret as string,
        cookie: {
            maxAge: 8 * 60 * 60 * 1000,
            secure: false,
            httpOnly: false
        },
        resave: false,
        saveUninitialized: false,
        store: pgSessionStore(session)
    }))

    return app;
}