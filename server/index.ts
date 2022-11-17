import express, { Request, Response } from 'express';
import cors from 'cors';

const port = 8080;
const app = express();
app.use(cors());

app.get('/', (req: Request, res: Response) => {
    res.send('express');
})

app.get('/hello', (req, res) => {
    res.send({ message: "hello from the server!!" });
})

app.listen(port, () => {
    console.log('listening on ' + port);
})