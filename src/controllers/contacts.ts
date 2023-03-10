import { Request, Response } from 'express';

import { Controller } from "./controller";

import { addContact, deleteContact, getAllContacts, getContactById, updateContact, updateContactStatus } from '../services/contacts';

import { Paths } from '../interfaces/controllers';
import { Contact, IContact } from '../interfaces/contacts';

import { asyncWrapper } from "../utils/errorsHandlers";
import { NotFoundError, InvalidParameterError } from '../utils/errors';

import { contactValidateSchema } from '../validation/contacts';

class Contacts extends Controller {
    constructor() {
        super(Paths.Contacts);
        this.router
            .get("/", asyncWrapper(this.getAll))
            .get("/:id", asyncWrapper(this.getById))
            .post("/", asyncWrapper(this.addContact))
            .put("/:id", asyncWrapper(this.updateContact))
            .patch("/:id", asyncWrapper(this.updateContactStatus))
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
            throw new NotFoundError('Contact not found')
        }

        return res.status(200).json({ data: contact })
    }

    private addContact = async (req: Request, res: Response) => {
        const contact = req.body;
        const validatedData = contactValidateSchema.validate(contact)

        if(validatedData.error) {
            const [ errorLable ] = validatedData.error.details

            throw new InvalidParameterError(`validation error: ${errorLable.context?.label}`)
        }

        const newContact: IContact = {
            [Contact.Name]: contact.name,
            [Contact.Email]: contact.email,
            [Contact.Phone]: contact.phone,
            [Contact.Favorite]: contact.favorite,
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

            throw new InvalidParameterError(`validation error: ${errorLable.context?.label}`)
        }

        const updatedContact = await updateContact( id, contact )

        if(!updatedContact) {
            throw new NotFoundError('Not found')
        }

        return res.status(200).json(updatedContact)
    }

    private updateContactStatus = async (req: Request, res: Response) => {
        const {id} = req.params;
        const contact = req.body;

        if (!contact) {
            throw new InvalidParameterError('missing field favorite')
        }

        const updatedContact = updateContactStatus(id, contact)

        return res.status(200).json(updatedContact)
    }

    private deleteContact = async (req: Request, res: Response) => {
        const { id } = req.params;
        const deletedContact = await deleteContact(id)

        if(!deletedContact) {
            throw new NotFoundError('Not found')
        }

        return res.status(200).json({
            message: 'Contact deleted successfully'
        })
    }
}

export default new Contacts();