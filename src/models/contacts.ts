import mongoose from "mongoose";

const { Schema, model } = mongoose;

import { Contact, IContact } from '../interfaces/contacts';

const contactSchema = new Schema<IContact>(
    {
        [Contact.Name]: {
            type: String,
            minLength: 3,
            maxLength: 30,
            unique: true,
            required: [true, "Set name for contact"],
        },
        [Contact.Email]: {
            type: String,
            minLength: 5,
            maxLength: 30,
            unique: true,
            required: true, 
        },
        [Contact.Phone]: {
            type: String,
            minLength: 8,
            maxLength: 20,
            unique: true,
            required: true,   
        },
        [Contact.Favorite]: {
            type: Boolean,
            default: false,
        }
    },
    { versionKey: false, timestamps: true }
);

export const Contacts = model<IContact>('contacts', contactSchema);