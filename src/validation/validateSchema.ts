import Joi from 'joi';

import { InvalidParameterError } from '../utils/errors';

const validateObj = Joi.object()

export const validateSchema = (schema: typeof validateObj, target: object) => {
    const { error } = schema.validate(target)

    if(error) {
        const [ errorLable ] = error.details

        throw new InvalidParameterError(`validation error: ${errorLable.context?.label}`)
    }
}