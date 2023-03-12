import mongoose from "mongoose";

import { Contact, IContact } from '../interfaces/contacts';

const { Schema, model, SchemaTypes } = mongoose;

const contactSchema = new Schema<IContact>(
    {
        [Contact.Name]: {
            type: String,
            minLength: 3,
            maxLength: 30,
            required: [true, "Set name for contact"],
        },
        [Contact.Email]: {
            type: String,
            minLength: 5,
            maxLength: 30,
            required: true, 
        },
        [Contact.Phone]: {
            type: String,
            minLength: 8,
            maxLength: 20,
            required: true,   
        },
        [Contact.Favorite]: {
            type: Boolean,
            default: false,
        },
        [Contact.Owner]: {
            type: SchemaTypes.ObjectId,
            ref: "user",
            required: true,
          },
    },
    { versionKey: false, timestamps: true }
);

export const Contacts = model<IContact>('contacts', contactSchema);