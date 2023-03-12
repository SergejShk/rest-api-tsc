export enum Contact {
    Id = 'id',
    Name = 'name',
    Email = 'email',
    Phone = 'phone',
    Favorite = 'favorite',
    Owner = 'owner',
}

export interface IContact {
    [Contact.Id]?: string,
    [Contact.Name]: string,
    [Contact.Email]: string,
    [Contact.Phone]: string
    [Contact.Favorite]?: boolean
    [Contact.Owner]?: string
}