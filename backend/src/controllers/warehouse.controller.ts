import { NextFunction, Request, Response } from 'express';
import { StatusCode } from '../enums/status-code.enum';
import AppError from '../errors/app-error';
import { deleteAllCategories, insertAndUpdateCategories } from '../services/category.service';
import CategoryModel from '../models/category.model';
import { deleteAllItems, insertAndUpdateItems } from '../services/item.service';
import { Status } from '../enums/status.enum';

export const getCategoriesHandler = async (
    _req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const categories = await CategoryModel.find().lean();

        res.status(StatusCode.OK).json(categories);
    } catch (err: any) {
        next(err);
    }
};

export const uploadCategoriesAndItemsHandler = async (
    req: Request<any, any, { categories: any[], items: any[] }>,
    res: Response,
    next: NextFunction
) => {
    try {
        if (!req.body.items || !req.body.categories) {
            return next(new AppError('No JSON data found', StatusCode.BAD_REQUEST));
        }

        await insertAndUpdateCategories(req.body.categories);
        await insertAndUpdateItems(req.body.items);

        res.status(StatusCode.OK).json({
            status: Status.SUCCESS,
            message: 'Categories and items uploaded successfully'
        });
    } catch (err: any) {
        next(err);
    }
};

export const deleteAllCategoriesAndItemsHandler = async (
    _req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        await deleteAllCategories();
        await deleteAllItems();

        res.status(StatusCode.OK).json({ message: 'All categories deleted successfully' });
    } catch (err: any) {
        next(err);
    }
};

