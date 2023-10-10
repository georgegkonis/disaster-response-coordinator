import { NextFunction, Request, Response } from 'express';
import Ajv from 'ajv';
import AppError from '../errors/app-error';
import { StatusCode } from '../enums/status-code.enum';

const ajv = new Ajv();

export const validateJson = (schema: object) => (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const validate = ajv.compile(schema);

    const isValid = validate(req.body.jsonData);

    if (!isValid) {
        return next(new AppError('Invalid JSON', StatusCode.BAD_REQUEST));
    }

    next();
};
