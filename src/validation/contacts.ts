import Joi from 'joi';

export const contactValidateSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().min(5).max(30).email({minDomainSegments: 2}).required(),
    phone: Joi.string().min(8).max(20).required()
})
