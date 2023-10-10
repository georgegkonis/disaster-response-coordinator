import { NextFunction, Request, Response } from 'express';
import { StatusCode } from '../enums/status-code.enum';
import AppError from '../errors/app-error';
import { deleteAllProducts, insertAndUpdateProducts } from '../services/product.service';

export const getProductsHandler = async (
    req: Request<{}, {}, {}, { name?: string, categoryId?: string }>,
    res: Response,
    next: NextFunction
) => {
    try {
        const { name, categoryId } = req.query;

        res.status(StatusCode.OK).json();
    } catch (err: any) {
        next(err);
    }
};

export const uploadProductsHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        if (!req.body.jsonData) {
            return next(new AppError('No JSON data found', StatusCode.BAD_REQUEST));
        }

        await insertAndUpdateProducts(req.body.jsonData);

        res.status(StatusCode.OK).json({ message: 'Data loaded successfully' });
    } catch (err: any) {
        next(err);
    }
};

export const deleteAllProductsHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        await deleteAllProducts();

        res.status(StatusCode.OK).json({ message: 'All products deleted successfully' });
    } catch (err: any) {
        next(err);
    }
};