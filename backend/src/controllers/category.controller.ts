import { NextFunction, Request, Response } from 'express';
import { StatusCode } from '../enums/status-code.enum';
import AppError from '../errors/app-error';
import { insertAndUpdateCategories } from '../services/category.service';

export const uploadCategoriesHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        if (!req.body.jsonData) {
            return next(new AppError('No JSON data found', StatusCode.BAD_REQUEST));
        }

        await insertAndUpdateCategories(req.body.jsonData);

        res.status(StatusCode.OK).json({ message: 'Data loaded successfully' });
    } catch (err: any) {
        next(err);
    }
};
