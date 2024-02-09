import { array, number, object, string, TypeOf } from 'zod';
import { isValidObjectId } from 'mongoose';
import { Ref } from '@typegoose/typegoose';
import { Category } from '../models/category.model';

//#region JSON Schemas

const detailJsonShape = object({
    detail_name: string(),
    detail_value: string()
}).strip();

const itemJsonSchema = object({
    id: string().min(1).refine(value => !isNaN(Number(value)), 'Item ID must be a string that can be parsed into a number'),
    name: string(),
    category: string().min(1).refine(value => !isNaN(Number(value)), 'Item category must be a string that can be parsed into a number'),
    details: array(detailJsonShape).min(1)
}).strip();

const categoryJsonSchema = object({
    id: string().min(1).refine(value => !isNaN(Number(value)), 'Category ID must be a string that can be parsed into a number'),
    category_name: string()
}).strip();

export const warehouseJsonSchema = object({
    body: object({
        code: number().optional(),
        message: string().optional(),
        items: array(itemJsonSchema),
        categories: array(categoryJsonSchema)
    }).strip()
});

//#endregion

const detailShape = object({
    name: string().min(1),
    value: string().min(1)
}).strip();

export const createItemSchema = object({
    body: object({
        name: string().min(1),
        category: string().refine(isValidObjectId, 'Invalid ID format'),
        details: array(detailShape).min(1)
    }).strip()
});

export const createCategorySchema = object({
    body: object({
        name: string().min(1)
    }).strip()
});

export const updateItemQuantitySchema = object({
    params: object({
        id: string().refine(isValidObjectId, 'Invalid ID format')
    }).strip(),

    body: object({
        quantity: number().min(0)
    }).strip()
});

export type WarehouseJsonInput = TypeOf<typeof warehouseJsonSchema>['body'];
export type CreateItemInput = TypeOf<typeof createItemSchema>['body'] & { id: number, category: Ref<Category> };
export type CreateCategoryInput = TypeOf<typeof createCategorySchema>['body'] & { id: number };
export type UpdateItemQuantityInput = TypeOf<typeof updateItemQuantitySchema>['body'];
