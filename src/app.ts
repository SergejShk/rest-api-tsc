import express, { Request, Response } from 'express';
import logger from 'morgan';
import cors from 'cors'

export const app = express();

const formatLogger = app.get("env") === "development" ? "dev" : "short"

app.use(logger(formatLogger));
app.use(cors())
app.use(express.json())

app.use('/', (_: Request, res: Response) => {
   return res.status(200).json('Hello!!!')
})

app.use((err: Error, _: Request, res: Response ) => {
    res.status(500).json({ message: err.message })
})
