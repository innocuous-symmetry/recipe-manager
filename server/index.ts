import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { loaders } from './loaders';

dotenv.config();

const port = 8080;
const app = express();
app.use(cors());

async function main() {
    await loaders(app);
    app.listen(port, () => {
        console.log('listening on port ' + port);
    })
};

export default app;

main();