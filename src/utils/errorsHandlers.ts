import { RequestHandler } from "express";

export const asyncWrapper = (controller: any): RequestHandler => {
    return (req, res, next) => {
        controller(req, res).catch(next)
    }
}