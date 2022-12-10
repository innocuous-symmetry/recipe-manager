import express from 'express';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import { loaders } from './loaders';

const port = 8080;
const app = express();
app.use(cors());

export const appRoot = path.resolve(__dirname);

export default async function main() {
    const app = express();
    await loaders(app);
    app.listen(port, () => {
        console.log('listening on port ' + port);
    })
};

main();