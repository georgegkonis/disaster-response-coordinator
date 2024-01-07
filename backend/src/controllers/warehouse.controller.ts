import { NextFunction, Request, Response } from 'express';
import { StatusCode } from '../enums/status-code.enum';
import { deleteAllCategories, findCategories, insertAndUpdateCategories } from '../services/category.service';
import { deleteAllItems, findItems, insertAndUpdateItems } from '../services/item.service';
import { Status } from '../enums/status.enum';

export const getCategoriesHandler = async (
    req: Request<{}, {}, {}, { name?: string }>,
    res: Response,
    next: NextFunction
) => {
    try {
        const categories = await findCategories(req.query);

        res.status(StatusCode.OK).json(categories);
    } catch (err: any) {
        next(err);
    }
};

export const getItemsHandler = async (
    req: Request<{}, {}, {}, { name?: string, category?: string }>,
    res: Response,
    next: NextFunction
) => {
    try {
        const items = await findItems(req.query);

        res.status(StatusCode.OK).json(items);
    } catch (err: any) {
        next(err);
    }
};

export const uploadCategoriesAndItemsHandler = async (
    req: Request<{}, {}, { categories: any[], items: any[] }>,
    res: Response,
    next: NextFunction
) => {
    try {
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

