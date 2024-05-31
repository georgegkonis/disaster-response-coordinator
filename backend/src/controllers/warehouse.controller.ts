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
    getIncrementedItemCode,
    insertAndUpdateItems,
    updateItemQuantity
} from '../services/item.service';
import { Status } from '../enums/status.enum';
import { Category } from '../models/category.model';
import { CreateCategoryInput, CreateItemInput, UpdateItemQuantityInput, WarehouseJsonInput } from '../schemas/warehouse.schema';
import { Item } from '../models/item.model';

export const uploadCategoriesAndItemsHandler = async (
    req: Request<{}, {}, WarehouseJsonInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        const categories: Category[] = transformCategories(req.body.categories);

        await insertAndUpdateCategories(categories);

        const items = await transformItems(req.body.items);

        await insertAndUpdateItems(items);

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
        req.body.code = await getIncrementedCategoryId();

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

        req.body.code = await getIncrementedItemCode();

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

function transformCategories(jsonData: any[]): Category[] {
    return jsonData.map((category) => ({ code: category.id, name: category.category_name }));
}

async function transformItems(jsonData: any[]): Promise<Item[]> {
    const ids = jsonData.map((x: any) => Number(x.category));
    const categories = await findCategories({ code: { $in: ids } });

    return jsonData.map((item) => {
        const category = categories.find((category: Category) => category.code.toString() === item.category);

        if (category) return { ...item, category: category._id!.toHexString(), code: item.id };
    });
}