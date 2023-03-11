import Joi from 'joi';

import { Contact } from '../interfaces/contacts';

export const contactValidateSchema = Joi.object({
    [Contact.Name]: Joi.string().min(3).max(30).required(),
    [Contact.Email]: Joi.string().min(5).max(30).email({minDomainSegments: 2}).required(),
    [Contact.Phone]: Joi.string().min(8).max(20).required(),
    [Contact.Favorite]: Joi.boolean(),
})
