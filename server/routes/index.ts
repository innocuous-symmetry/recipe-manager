import { Express } from "express"

export const routes = (app: Express, passport?: any) => {
    app.get('/hello', (req, res) => {
        res.send({ message: "hello from the server!!" });
    })
}