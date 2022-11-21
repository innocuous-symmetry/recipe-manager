import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import { loaders } from './loaders';

const port = 8080;
const app = express();
app.use(cors());

(async function() {
    const app = express();
    await loaders(app);
    app.listen(port, () => {
        console.log('listening on port ' + port);
    })
})();
