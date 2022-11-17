import express, { Request, Response } from 'express';
const app = express();
const port = 8080;

app.get('/', (req: Request, res: Response) => {
    res.send('express');
})

app.listen(port, () => {
    console.log('listening on ' + port);
})