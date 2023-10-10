import { NextFunction, Request, Response } from 'express';
import { StatusCode } from '../enums/status-code.enum';
import AppError from '../errors/app-error';
import { deleteAllCategories, insertAndUpdateCategories } from '../services/category.service';
import CategoryModel, { Category, Subcategory } from '../models/category.model';
import ProductModel, { Product } from '../models/product.model';

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

export const deleteAllCategoriesHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        await deleteAllCategories();

        res.status(StatusCode.OK).json({ message: 'All categories deleted successfully' });
    } catch (err: any) {
        next(err);
    }
};

export const getCategoriesWithProductsHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        // Fetch categories from your database
        const categories = await CategoryModel.find().lean();

        // Fetch products from your database
        const products = await ProductModel.find().lean();

        let hierarchy: object[] = [];

        categories.forEach((category: Category) => {
            category.subcategories.forEach((subcategory: Subcategory) => {
                const subcategoryProducts = products.filter(
                    (product: Product) => product.subcategory === subcategory.uuid
                );

                hierarchy.push({
                    category: category.name,
                    subcategory: subcategory.name,
                    products: subcategoryProducts
                });
            });
        });

        return res.status(200).json(hierarchy);
    } catch (err: any) {
        // Pass the error to the error handling middleware
        next(err);
    }
};

