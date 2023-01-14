import { Express } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import session from 'express-session';
import pgSessionStore from '../db/sessionStore';
import { IUser } from '../schemas';

declare module "express-session" {
    interface SessionData {
        user: IUser
    }
}

export const expressLoader = async (app: Express) => {
    app.use(cors({
        origin: process.env.ORIGIN || 'http://localhost:5173',
        credentials: true
      }));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser());

    // app.options("*", cors({ origin: 'http://localhost:5173', optionsSuccessStatus: 200 }));
    // app.use(cors({ origin: "http://localhost:5173", optionsSuccessStatus: 200 }));

    app.use(morgan('tiny'));

    app.get('/', (req, res) => {
        res.cookie('name', 'express').send('cookie set');
    })

    const secret = process.env.SESSIONSECRET as string;

    app.use(session({
        secret: secret,
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