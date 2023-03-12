import { Contacts } from '../models/contacts'

import { IContact } from '../interfaces/contacts';

export const getAllContacts = async (owner: string) => {
    return await Contacts.find({ owner })
}

export const getContactById = async (contactId: string, owner: string) => {
    return await Contacts.findOne({
        _id: contactId,
        owner,
    })
}

export const addContact = async (contact: IContact) => {
    const newContact = new Contacts({...contact})

    await newContact.save()

    return newContact
}

export const updateContact = async (contactId: string, contact: IContact, owner: string) => {
const { name, email, phone, favorite } = contact

    return await Contacts.findOneAndUpdate(
        {_id: contactId, owner}, 
        { $set: { name, email, phone, favorite }}
    )
}

export const updateContactStatus = async (contactId: string, contact: IContact, owner: string) => {
    const { favorite } = contact;

    return await Contacts.findOneAndUpdate(
        {_id: contactId, owner}, 
        { $set: { favorite }}
    )
}

export const deleteContact = async (contactId: string, owner: string) => {
    return await Contacts.findOneAndRemove({_id: contactId, owner});
}
