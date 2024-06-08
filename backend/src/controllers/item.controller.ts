import { NextFunction, Request, Response } from 'express';
import { CreateItemInput, UpdateItemInput } from '../schemas/item.schema';
import { getCategory } from '../services/category.service';
import { createItem, deleteItem, deleteItems, findItems, getIncrementedItemCode, updateItem } from '../services/item.service';
import { StatusCode } from '../enums/status-code.enum';
import { QueryOptions } from 'mongoose';

export const findItemsHandler = async (
    req: Request<{}, {}, {}, { name?: string, category?: string }>,
    res: Response,
    next: NextFunction
) => {
    try {
        const options: QueryOptions = { populate: 'category' };
        const items = await findItems(req.query, options);

        res.status(StatusCode.OK).json(items);
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

export const updateItemHandler = async (
    req: Request<{ id: string }, {}, UpdateItemInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        const item = await updateItem(req.params.id, req.body);

        res.status(StatusCode.OK).json(item);
    } catch (err: any) {
        next(err);
    }
};

export const deleteItemHandler = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
) => {
    try {
        await deleteItem(req.params.id);

        res.status(StatusCode.NO_CONTENT).json();
    } catch (err: any) {
        next(err);
    }
};

export const deleteItemsHandler = async (
    req: Request<{}, {}, { ids: string[] }>,
    res: Response,
    next: NextFunction
) => {
    try {
        await deleteItems({ _id: { $in: req.body.ids } });

        res.status(StatusCode.NO_CONTENT).json();
    } catch (err: any) {
        next(err);
    }
};