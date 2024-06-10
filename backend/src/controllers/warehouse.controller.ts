import { NextFunction, Request, Response } from 'express';
import { StatusCode } from '../enums/status-code.enum';
import { deleteCategories, findCategories, insertAndUpdateCategories } from '../services/category.service';
import { deleteItems, findItems, insertAndUpdateItems } from '../services/item.service';
import { Status } from '../enums/status.enum';
import { Category } from '../models/category.model';
import { WarehouseJsonInput } from '../schemas/warehouse.schema';
import { Item } from '../models/item.model';

export const importDataHandler = async (
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

export const exportDataHandler = async (
    _req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const categories = await findCategories();
        const items = await findItems({}, { populate: 'category' });

        const jsonData = {
            categories: categories.map((category) => ({
                id: category.code.toString(),
                category_name: category.name
            })),
            items: items.map((item) => ({
                id: item.code.toString(),
                name: item.name,
                category: (item.category as Category).code.toString(),
                details: item.details.map((detail) => ({ detail_name: detail.name, detail_value: detail.value }))
            }))
        };

        res.status(StatusCode.OK).json(jsonData);
    } catch (err: any) {
        next(err);
    }
};

export const clearDataHandler = async (
    _req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        await deleteCategories();
        await deleteItems();

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