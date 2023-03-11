export enum User {
    Id = 'id',
    Email = 'email',
    Password = 'password',
    Subscribtion = 'subscription',
    Token = 'token',
}

export interface IUser {
    [User.Id]?: string,
    [User.Email]: string,
    [User.Password]: string,
    [User.Subscribtion]?: string
    [User.Token]?: boolean
}