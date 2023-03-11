import { Request, Response } from 'express';

import { Controller } from "./controller";

import { signupUser } from '../services/auth';

import { asyncWrapper } from "../utils/errorsHandlers";

import { validateSchema } from '../validation/validateSchema';
import { userValidateSchema } from '../validation/users';

import { Paths } from '../interfaces/controllers';

class Auth extends Controller {
    constructor() {
        super(Paths.Auth)
        this.router
            .post("/signup", asyncWrapper(this.register))
    }

    private register = async (req: Request, res: Response) => {
        validateSchema(userValidateSchema, req.body)

        const response = await signupUser(req.body)
        const {password, ...user} = response.toObject()

        return res.status(201).json(user)
    }
}

export default new Auth()
