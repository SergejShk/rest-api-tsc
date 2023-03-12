import { Request, Response } from 'express';

import { Controller } from "./controller";

import { loginUser, signupUser } from '../services/auth';

import { asyncWrapper } from "../utils/errorsHandlers";

import { validateSchema } from '../validation/validateSchema';
import { userValidateSchema } from '../validation/users';

import { Paths } from '../interfaces/controllers';

class Auth extends Controller {
    constructor() {
        super(Paths.Auth)
        this.router
            .post("/signup", asyncWrapper(this.register))
            .post("/login", asyncWrapper(this.login))
    }

    private register = async (req: Request, res: Response) => {
        validateSchema(userValidateSchema, req.body)

        const user = await signupUser(req.body)

        return res.status(201).json(user)
    }

    private login = async (req: Request, res: Response) => {
        validateSchema(userValidateSchema, req.body)

        const user = await loginUser(req.body)
      
        return res.status(200).json(user)
    }
}

export default new Auth()
