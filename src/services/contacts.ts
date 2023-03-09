import fs from 'fs';
import path from 'path';

import { Contact, IContact } from 'interfaces/contacts';

const contactsPath = path.join(__dirname, '../../data/contacts.json')

export const getAllContacts = async () => {
    const contacts = await fs.promises.readFile(contactsPath, { encoding: 'utf8' })

    return JSON.parse(contacts)
}

export const getContactById = async (contactId: string) => {
    const contacts = await getAllContacts()
    const [contact] = contacts.filter((contact: IContact) => contact.id === contactId)

    return contact
}

export const addContact = async (contact: IContact) => {
    const contacts = await getAllContacts()
    const newConacts = [...contacts, contact]
    fs.writeFile(contactsPath, JSON.stringify(newConacts, null, 2), () => {})

    return contact
}

export const updateContact = async (contactId: string, contact: IContact) => {
    const { name, email, phone } = contact;
    const contacts = await getAllContacts();
    const contactIdx = contacts.findIndex((contact: IContact) => contact.id === contactId)

    if( contactIdx === -1 ) {
        throw new Error("No contact found")
    }

    contacts[contactIdx] = {
        [Contact.Id]: contactId,
        name,
        email,
        phone,
    }

    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), () => {})

    return contacts[contactIdx]
}

export const deleteContact = async (contactId: string) => {
    const contacts = await getAllContacts();
    const contactIdx = contacts.findIndex((contact: IContact) => contact.id === contactId)

    if( contactIdx === -1 ) {
        throw new Error("No contact found")
    }

    const [deletedContact] = contacts.splice(contactIdx, 1)
    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), () => {})

    return deletedContact
}