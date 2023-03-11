import bcrypt from 'bcrypt';

import { Users } from '../models/user';

import { DuplicateUserError } from '../utils/errors';

import { IUser } from '../interfaces/users';

export const signupUser = async (body: IUser) => {
    const { email, password } = body;

    const user = await Users.findOne({ email })

    if (user) {
        throw new DuplicateUserError()
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    return await Users.create({
        ...body,
        password: hashedPassword,
    })
}