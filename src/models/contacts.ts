import mongoose from "mongoose";

import { IContact } from '../interfaces/contacts';

const { Schema, model } = mongoose;

const contactSchema = new Schema<IContact>({
    name: {
        type: String,
        minLength: 3,
        maxLength: 30,
        unique: true,
        required: [true, "Set name for contact"],
    },
    email: {
        type: String,
        minLength: 5,
        maxLength: 30,
        unique: true,
        required: true, 
    },
    phone: {
        type: String,
        minLength: 8,
        maxLength: 20,
        unique: true,
        required: true,   
    },
    favorite: {
        type: Boolean,
        default: false,
    }
});

export const Contacts = model('contacts', contactSchema);