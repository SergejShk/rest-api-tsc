export enum Contact {
    Id = 'id',
    Name = 'name',
    Email = 'email',
    Phone = 'phone',
}

export interface IContact {
    [Contact.Id]: string,
    [Contact.Name]: string,
    [Contact.Email]: string,
    [Contact.Phone]: string
}