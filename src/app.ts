import express, { Request, Response } from 'express';
import logger from 'morgan';
import cors from 'cors'

import contacts from './controllers/contacts'
import auth from './controllers/auth'

export const app = express();

const formatLogger = app.get("env") === "development" ? "dev" : "short"

app.use(logger(formatLogger));
app.use(cors())
app.use(express.json())

app.use(auth.path, auth.router)
app.use(contacts.path, contacts.router)

app.use('*', ( _: Request, res: Response ) => {
    res.status(404).json({ message: 'Page not found' })
})

app.use((err: Error, _: Request, res: Response ) => {
    res.status(500).json({ message: err.message })
})
