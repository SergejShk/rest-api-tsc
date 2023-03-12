import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

import { Users } from '../models/user';

import { DuplicateUserError, InvalidParameterError } from '../utils/errors';

import { IUser, User } from '../interfaces/users';

export const signupUser = async (body: IUser) => {
    const { email } = body;

    const user = await Users.findOne({ email })

    if (user) {
        throw new DuplicateUserError()
    }

    const hashedPassword = await bcrypt.hash(body.password, 10)

    const response = await Users.create({
        ...body,
        password: hashedPassword,
    })

    const { password, ...newUser } = response.toObject()

    return newUser
}

export const loginUser = async (body: IUser) => {
    const { email } = body;

    const user = await Users.findOne({ email })
    const isValidPassword = user && await bcrypt.compare(body.password, user.password)

    if (!user || !isValidPassword) {
        throw new InvalidParameterError("Email or password is wrong")
    }

     user.token = jwt.sign(
        {
            [User.Id]: user._id,
            [User.Email]: user.email,
        },
        process.env.JWT_SECRET!,
        { expiresIn: "1h" }
     )

     const { password, ...newUser } = user.toObject()

    return { newUser }
}
