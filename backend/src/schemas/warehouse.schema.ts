import { object, string, array, number, TypeOf } from 'zod';

//#region JSON Schemas

const detailJsonSchema = object({
    detail_name: string({ required_error: 'Detail name is required' }),
    detail_value: string({ required_error: 'Detail value is required' })
}).strip();

const itemJsonSchema = object({
    id: string({ required_error: 'Item ID is required' })
        .min(1, { message: 'Item ID cannot be empty' })
        .refine(value => !isNaN(Number(value)), { message: 'Item ID must be a string that can be parsed into a number' }),
    name: string({ required_error: 'Item name is required' }),
    category: string({ required_error: 'Item category is required' })
        .min(1, { message: 'Item category cannot be empty' }),
    details: array(detailJsonSchema, { required_error: 'Item details are required' })
        .min(1, { message: 'Item details cannot be empty' })
}).strip();

const categoryJsonSchema = object({
    id: string({ required_error: 'Category ID is required' })
        .min(1, { message: 'Category ID cannot be empty' })
        .refine(value => !isNaN(Number(value)), { message: 'Category ID must be a string that can be parsed into a number' }),
    category_name: string({ required_error: 'Category name is required' })
}).strip();

export const warehouseJsonSchema = object({
    body: object({
        code: number().optional(),
        message: string().optional(),
        items: array(itemJsonSchema, { required_error: 'Items are required' }),
        categories: array(categoryJsonSchema, { required_error: 'Categories are required' })
    }).strip()
});

//#endregion

const detailSchema = object({
    name: string({ required_error: 'Detail name is required' }),
    value: string({ required_error: 'Detail value is required' })
}).strip();

export const createItemSchema = object({
    body: object({
        id: string({ required_error: 'Item ID is required' })
            .min(1, { message: 'Item ID cannot be empty' })
            .refine(value => !isNaN(Number(value)), { message: 'Item ID must be a string that can be parsed into a number' }),
        name: string({ required_error: 'Item name is required' }),
        category: string({ required_error: 'Item category is required' })
            .min(1, { message: 'Item category cannot be empty' }),
        details: array(detailSchema, { required_error: 'Item details are required' })
            .min(1, { message: 'Item details cannot be empty' })
    }).strip()
});

export const createCategorySchema = object({
    body: object({
        id: string({ required_error: 'Category ID is required' })
            .min(1, { message: 'Category ID cannot be empty' })
            .refine(value => !isNaN(Number(value)), { message: 'Category ID must be a string that can be parsed into a number' }),
        name: string({ required_error: 'Category name is required' })
    }).strip()
});

export const updateItemQuantitySchema = object({
    params: object({
        id: string({ required_error: 'Item ID is required' })
            .min(1, { message: 'Item ID cannot be empty' })
            .refine(value => !isNaN(Number(value)), { message: 'Item ID must be a string that can be parsed into a number' })
    }).strip(),
    body: object({
        quantity: number({ required_error: 'Item quantity is required' })
            .min(1, { message: 'Item quantity must be greater than 0' })
    }).strip()
});

export type CreateItemInput = TypeOf<typeof createItemSchema>['body'];

export type CreateCategoryInput = TypeOf<typeof createCategorySchema>['body'];

export type UpdateItemQuantityInput = TypeOf<typeof updateItemQuantitySchema>['body'];
