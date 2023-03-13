import { Request, Response } from 'express';

import { Controller } from "./controller";

import { loginUser, logoutUser, signupUser, uploadAvatarService } from '../services/auth';

import { checkAuth } from '../middlewares/checkAuth';

import { asyncWrapper } from "../utils/errorsHandlers";

import { validateSchema } from '../validation/validateSchema';
import { userValidateSchema } from '../validation/users';

import { uploadFiles } from '../middlewares/uploadFiles';

import { Paths } from '../interfaces/controllers';

class Auth extends Controller {
    constructor() {
        super(Paths.Auth)
        this.router
            .post("/signup", asyncWrapper(this.register))
            .post("/login", asyncWrapper(this.login))
            .patch("/logout", checkAuth, asyncWrapper(this.logout))
            .patch("/avatar", checkAuth, uploadFiles.single('avatar'), asyncWrapper(this.uploadAvatar))
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

    private logout = async (req: Request, res: Response) => {
        //@ts-ignore
        const { id } = req.user

        await logoutUser(id)

        return res.status(204).json('No content')
    }

    private uploadAvatar = async (req: Request, res: Response) => {
        //@ts-ignore
        const { id: userId } = req.user;

        const user = await uploadAvatarService(userId, req.file);
      
        res.status(200).json({ avatarURL: user?.avatarURL });
    }
}

export default new Auth()
