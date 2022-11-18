import { Express } from 'express';
import swaggerUI from 'swagger-ui-express';
import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';

const swaggerDocument = yaml.load(fs.readFileSync(path.resolve(__dirname, '../swagger.yaml'), 'utf-8'));

export const swaggerLoader = (app: Express) => {
    app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument!));
}