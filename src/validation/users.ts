import Joi from 'joi';

import { User } from '../interfaces/users';

export const userValidateSchema = Joi.object({
    [User.Email]: Joi.string().min(5).max(30).email({minDomainSegments: 2}).required(),
    [User.Password]: Joi.string().min(3).max(30).required(),
})
