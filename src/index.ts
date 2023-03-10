import "reflect-metadata"
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import { app } from './app';

dotenv.config()
const PORT = process.env.PORT || 3000

const start = async () => {
    try {
        const db = process.env.DB_URL

        if (!db) {
            throw new Error()
        }

        await mongoose.connect(db)
        console.log('Database connection seccessfully');

        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        })
    } catch (error: any) {
        console.log(error.message);
        process.exit(1);
    }
}

start()