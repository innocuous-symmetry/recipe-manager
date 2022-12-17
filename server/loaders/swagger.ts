import { Express } from 'express';
import swaggerUI from 'swagger-ui-express';
import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';
import { appRoot } from '../appRoot';

const swaggerDocument = yaml.load(fs.readFileSync(path.resolve(appRoot, './swagger.yaml'), 'utf-8'));

export const swaggerLoader = async (app: Express) => {
    app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument!));
}