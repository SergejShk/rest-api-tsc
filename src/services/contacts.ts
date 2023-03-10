import { Contacts } from '../models/contacts'

import { IContact } from '../interfaces/contacts';


export const getAllContacts = async () => {
    return await Contacts.find({})
}

export const getContactById = async (contactId: string) => {
    return await Contacts.findById(contactId)
}

export const addContact = async (contact: IContact) => {
    const newContact = new Contacts({...contact})

    await newContact.save()

    return newContact
}

export const updateContact = async (contactId: string, contact: IContact) => {
const { name, email, phone, favorite } = contact

    return await Contacts.findByIdAndUpdate(contactId, {
        $set: { name, email, phone, favorite }
    })
}

export const updateContactStatus = async (contactId: string, contact: IContact) => {
    const { favorite } = contact;

    return await Contacts.findByIdAndUpdate(contactId, {
        $set: { favorite },
    })
}

export const deleteContact = async (contactId: string) => {
    return await Contacts.findByIdAndDelete(contactId);
}