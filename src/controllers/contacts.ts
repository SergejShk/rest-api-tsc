import { Request, Response } from 'express';

import { Controller } from "./controller";

import { checkAuth } from '../middlewares/checkAuth'

import { 
    addContact,
    deleteContact,
    getAllContacts,
    getContactById,
    updateContact,
    updateContactStatus 
        } from '../services/contacts';

import { Paths } from '../interfaces/controllers';
import { Contact, IContact } from '../interfaces/contacts';

import { asyncWrapper } from "../utils/errorsHandlers";
import { NotFoundError, InvalidParameterError, UnauthorizedError } from '../utils/errors';

import { contactValidateSchema } from '../validation/contacts';
import { validateSchema } from '../validation/validateSchema';

class Contacts extends Controller {
    constructor() {
        super(Paths.Contacts);
        this.router
            .get("/", checkAuth, asyncWrapper(this.getAll))
            .get("/:id", checkAuth, asyncWrapper(this.getById))
            .post("/", checkAuth, asyncWrapper(this.addContact))
            .put("/:id", checkAuth, asyncWrapper(this.updateContact))
            .patch("/:id", checkAuth, asyncWrapper(this.updateContactStatus))
            .delete("/:id", checkAuth, asyncWrapper(this.deleteContact))
    }

    private getAll = async (req: Request, res: Response ) => {
        //@ts-ignore
        const owner = req.user.id

        if(!owner) {
            throw new UnauthorizedError()
        }

        const contacts = await getAllContacts(owner)

        return res.status(200).json({data: contacts})
    }

    private getById = async (req: Request, res: Response) => {
        //@ts-ignore
        const owner = req.user.id

        if(!owner) {
            throw new UnauthorizedError()
        }

        const { id } = req.params
        
        const contact = await getContactById(id, owner)

        if (!contact) {
            throw new NotFoundError('Contact not found')
        }

        return res.status(200).json({ data: contact })
    }

    private addContact = async (req: Request, res: Response) => {
        //@ts-ignore
        const owner = req.user.id;

        if(!owner) {
            throw new UnauthorizedError()
        }

        const contact = req.body;

        validateSchema(contactValidateSchema, contact)

        const newContact: IContact = {
            [Contact.Name]: contact.name,
            [Contact.Email]: contact.email,
            [Contact.Phone]: contact.phone,
            [Contact.Favorite]: contact.favorite,
            [Contact.Owner]: owner,
        }

        const addedContact = await addContact(newContact)

        return res.status(201).json(addedContact)
    }

    private updateContact = async (req: Request, res: Response) => {
        //@ts-ignore
        const owner = req.user.id

        if(!owner) {
            throw new UnauthorizedError()
        }

        const { id } = req.params;
        const contact = req.body;

        validateSchema(contactValidateSchema, contact)

        const updatedContact = await updateContact( id, contact, owner )

        if(!updatedContact) {
            throw new NotFoundError('Not found')
        }

        return res.status(200).json(updatedContact)
    }

    private updateContactStatus = async (req: Request, res: Response) => {
        //@ts-ignore
        const owner = req.user.id;

        if(!owner) {
            throw new UnauthorizedError()
        }

        const { id } = req.params;
        const contact = req.body;

        if (!contact) {
            throw new InvalidParameterError('missing field favorite')
        }

        const updatedContact = updateContactStatus(id, contact, owner)

        return res.status(200).json(updatedContact)
    }

    private deleteContact = async (req: Request, res: Response) => {
        //@ts-ignore
        const owner = req.user.id;

        if(!owner) {
            throw new UnauthorizedError()
        }
       
        const { id } = req.params;
        const deletedContact = await deleteContact(id, owner)

        if(!deletedContact) {
            throw new NotFoundError('Not found')
        }

        return res.status(200).json({
            message: 'Contact deleted successfully'
        })
    }
}

export default new Contacts();