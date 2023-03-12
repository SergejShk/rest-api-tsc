export class InvalidParameterError extends Error {
    status: number;

    constructor(message: string) {
        super(message);
        this.status = 400
    }
}

export class NotFoundError extends Error {
    status: number;

    constructor(message: string) {
        super(message);
        this.status = 404
    }
}

export class DuplicateUserError extends Error {
    status: number;
    message: string;

    constructor() {
        super();
        this.message = "User already exists"
        this.status = 409
    }
}

export class UnauthorizedError extends Error {
    status: number;
    message: string;

    constructor() {
        super();
        this.message = "Unauthorized"
        this.status = 401
    }
}