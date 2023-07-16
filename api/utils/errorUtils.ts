import {NextFunction} from "express";

export const errorLogger = (error: Error, request: Request, response: Response, next: NextFunction) => {
    console.log(`error ${error.message}`);
    next(error);
}

export const errorResponder = (error: Error, request: Request, response: Response, next: NextFunction) => {
    // @ts-ignore
    response.status(500).send(error.message);
}