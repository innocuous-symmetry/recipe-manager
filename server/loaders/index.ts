import { Express } from 'express';
import { expressLoader } from './express';
import { swaggerLoader } from './swagger';
import { routes } from '../routes';
import { passportLoader } from './passport';

export const loaders = async (app: Express) => {
    const expressApp = await expressLoader(app);
    await passportLoader(expressApp);
    await swaggerLoader(expressApp);
    await routes(expressApp);
}