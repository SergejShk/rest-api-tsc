import { Request, Response } from 'express';
import { uuid } from 'uuidv4';

import { Controller } from "./controller";
import { addContact, deleteContact, getAllContacts, getContactById, updateContact } from '../services/contacts';

import { asyncWrapper } from "../utils/errorsHandlers";
import { Paths } from '../interfaces/controllers';
import { Contact } from 'interfaces/contacts';
import { contactValidateSchema } from 'validation/contacts';

class Contacts extends Controller {
    constructor() {
        super(Paths.Contacts);
        this.router
            .get("/", asyncWrapper(this.getAll))
            .get("/:id", asyncWrapper(this.getById))
            .post("/", asyncWrapper(this.addContact))
            .put("/:id", asyncWrapper(this.updateContact))
            .delete("/:id", asyncWrapper(this.deleteContact))
    }

    private getAll = async (_: Request, res: Response ) => {
        const contacts = await getAllContacts()

        return res.status(200).json({data: contacts})
    }

    private getById = async (req: Request, res: Response) => {
        const { id } = req.params
        const contact = await getContactById(id)

        if (!contact) {
            res.status(404).json({message: 'Not Found'})
        }

        return res.status(200).json({ data: contact })
    }

    private addContact = async (req: Request, res: Response) => {
        const contact = req.body;
        const validatedData = contactValidateSchema.validate(contact)

        if(validatedData.error) {
            const [ errorLable ] = validatedData.error.details

            return res.status(400).json({
                message: `validation error: ${errorLable.context?.label}`
            })
        }

        const newContact = {
            [Contact.Id]: uuid(),
            [Contact.Name]: contact.name,
            [Contact.Email]: contact.email,
            [Contact.Phone]: contact.phone,
        }

        const addedContact = await addContact(newContact)

        return res.status(201).json(addedContact)
    }

    private updateContact = async (req: Request, res: Response) => {
        const { id } = req.params;
        const contact = req.body;
        const validatedData = contactValidateSchema.validate(contact)

        if(validatedData.error) {
            const [ errorLable ] = validatedData.error.details

            return res.status(400).json({
                message: `validation error: ${errorLable.context?.label}`
            })
        }

        const updatedContact = await updateContact( id, contact )

        if(!updatedContact) {
            return res.status(404).json({
                message: 'Not found'
            })
        }

        return res.status(200).json(updatedContact)
    }

    private deleteContact = async (req: Request, res: Response) => {
        const { id } = req.params;
        const deletedContact = await deleteContact(id)

        if(!deletedContact) {
            return res.status(404).json({
                message: 'Not found'
            })
        }

        return res.status(200).json({
            message: 'Contact deleted successfully'
        })
    }
}

export default new Contacts();