import { NextFunction, Request, Response } from 'express';
import { CreateCategoryInput, UpdateCategoryInput } from '../schemas/category.schema';
import {
    createCategory,
    deleteCategories,
    deleteCategory,
    findCategories,
    getIncrementedCategoryCode,
    updateCategory
} from '../services/category.service';
import { StatusCode } from '../enums/status-code.enum';
import { deleteItems } from '../services/item.service';

export const findCategoriesHandler = async (
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

export const createCategoryHandler = async (
    req: Request<{}, {}, CreateCategoryInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        req.body.code = await getIncrementedCategoryCode();

        const category = await createCategory(req.body);

        res.status(StatusCode.CREATED).json(category);
    } catch (err: any) {
        next(err);
    }
};

export const updateCategoryHandler = async (
    req: Request<{ id: string }, {}, UpdateCategoryInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        const category = await updateCategory(req.params.id, req.body);

        res.status(StatusCode.OK).json(category);
    } catch (err: any) {
        next(err);
    }
};

export const deleteCategoryHandler = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
) => {
    try {
        await deleteCategory(req.params.id);
        await deleteItems({ category: req.params.id });

        res.status(StatusCode.NO_CONTENT).json();
    } catch (err: any) {
        next(err);
    }
};

export const deleteCategoriesHandler = async (
    req: Request<{}, {}, { ids: string[] }>,
    res: Response,
    next: NextFunction
) => {
    try {
        await deleteCategories({ _id: { $in: req.body.ids } });
        await deleteItems({ category: { $in: req.body.ids } });

        res.status(StatusCode.NO_CONTENT).json();
    } catch (err: any) {
        next(err);
    }
};