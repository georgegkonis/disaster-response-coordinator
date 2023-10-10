import { NextFunction, Request, Response } from 'express';
import { StatusCode } from '../enums/status-code.enum';
import AppError from '../errors/app-error';
import { insertAndUpdateStores } from '../services/store.service';

export const uploadStoresHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        if (!req.body.jsonData) {
            return next(new AppError('No JSON data found', StatusCode.BAD_REQUEST));
        }

        await insertAndUpdateStores(req.body.jsonData);

        res.status(StatusCode.OK).json({ message: 'Data loaded successfully' });
    } catch (err: any) {
        next(err);
    }
};
