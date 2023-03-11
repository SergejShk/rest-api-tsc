import mongoose from "mongoose";

import { User, IUser } from '../interfaces/users';

const { Schema, model } = mongoose;

const userSchema = new Schema<IUser> (
    {
        [User.Email]: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
        },
        [User.Password]: {
            type: String,
            required: [true, "Password is required"], 
        },
        [User.Subscribtion]: {
            type: String,
            enum: ["starter", "pro", "business"],
            default: "starter",
        },
        [User.Token]: {
            type: String,
            default: '', 
        },
    },
    { versionKey: false, timestamps: true }
)

export const Users = model<IUser>('users', userSchema)
