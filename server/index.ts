import express from 'express';
import dotenv from 'dotenv';
import { loaders } from './loaders';

dotenv.config();

const port = process.env.PORT || 8080;
const app = express();

async function main() {
    await loaders(app);
    app.listen(port, () => {
        console.log('listening on port ' + port);
    })
};

export default app;

main();