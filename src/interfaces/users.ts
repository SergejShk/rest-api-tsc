export enum User {
    Id = 'id',
    Email = 'email',
    Password = 'password',
    Subscribtion = 'subscription',
    Token = 'token',
    AvatarURL = 'avatarURL',
}

export enum ISubscription {
    Starter = 'starter',
    Pro = 'pro',
    Business = 'business',
}

export interface IUser {
    [User.Id]?: string,
    [User.Email]: string,
    [User.Password]: string,
    [User.Subscribtion]?: ISubscription,
    [User.Token]?: string,
    [User.AvatarURL]: string,
}