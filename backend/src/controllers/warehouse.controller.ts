import { NextFunction, Request, Response } from 'express';
import { StatusCode } from '../enums/status-code.enum';
import {
    createCategory,
    deleteAllCategories,
    findCategories,
    getCategory,
    getIncrementedCategoryId,
    insertAndUpdateCategories
} from '../services/category.service';
import {
    createItem,
    deleteAllItems,
    findItems,
    getIncrementedItemId,
    insertAndUpdateItems,
    updateItemQuantity
} from '../services/item.service';
import { Status } from '../enums/status.enum';
import { Category } from '../models/category.model';
import { CreateCategoryInput, CreateItemInput, UpdateItemQuantityInput, WarehouseJsonInput } from '../schemas/warehouse.schema';

export const uploadCategoriesAndItemsHandler = async (
    req: Request<{}, {}, WarehouseJsonInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        await insertAndUpdateCategories(req.body.categories);

        const validItems = await mapItemCategoryIdsToObjectIds(req.body.items);

        await insertAndUpdateItems(validItems);

        res.status(StatusCode.OK).json({
            status: Status.SUCCESS,
            message: 'Categories and items uploaded successfully'
        });
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
        req.body.id = await getIncrementedCategoryId();

        const category = await createCategory(req.body);

        res.status(StatusCode.CREATED).json(category);
    } catch (err: any) {
        next(err);
    }
};

export const createItemHandler = async (
    req: Request<{}, {}, CreateItemInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        await getCategory(req.body.category);

        req.body.id = await getIncrementedItemId();

        const item = await createItem(req.body);

        res.status(StatusCode.CREATED).json(item);
    } catch (err: any) {
        next(err);
    }
};

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

export const updateItemQuantityHandler = async (
    req: Request<{ id: string }, {}, UpdateItemQuantityInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        const item = await updateItemQuantity(req.params.id, req.body.quantity);

        res.status(StatusCode.OK).json(item);
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

        res.status(StatusCode.NO_CONTENT).json();
    } catch (err: any) {
        next(err);
    }
};

async function mapItemCategoryIdsToObjectIds(items: any[]) {
    const ids = items.map((item: any) => Number(item.category));
    const categories = await findCategories({ id: { $in: ids } });

    return items.map((item: any) => {
        const category = categories.find((category: Category) => category.id.toString() === item.category);

        if (category) return { ...item, category: category._id!.toHexString() };
    });
}