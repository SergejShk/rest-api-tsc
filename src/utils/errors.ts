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
