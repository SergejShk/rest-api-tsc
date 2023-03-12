import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

import { UnauthorizedError } from "../utils/errors";
import { Users } from '../models/user';

dotenv.config()

export const checkAuth = async (req: Request, _: Response, next: NextFunction) => {
    try {
        const { authorization = '' } = req.headers;
        const [bearer, token] = authorization.split(' ')

        if ( bearer !== 'Bearer' || !token ) {
            throw new UnauthorizedError()
        }
        //@ts-ignore
        const { id } = jwt.verify(token, process.env.JWT_SECRET!)
        
        if ( !id ) {
            throw new UnauthorizedError()
        }

        const user = await Users.findById(id)

        if ( !user ) {
            throw new UnauthorizedError()
        }

        //@ts-ignore
        req.user = user

        next()
    } catch (error) {
        next(error);
    }
}