import { object, string, array, number } from 'zod';

const detailSchema = object({
    detail_name: string({ required_error: 'Detail name is required' }),
    detail_value: string({ required_error: 'Detail value is required' })
}).strip();

const itemSchema = object({
    id: string({ required_error: 'Item ID is required' })
        .min(1, { message: 'Item ID cannot be empty' })
        .refine(value => !isNaN(Number(value)), { message: 'Item ID must be a string that can be parsed into a number' }),
    name: string({ required_error: 'Item name is required' }),
    category: string({ required_error: 'Item category is required' })
        .min(1, { message: 'Item category cannot be empty' }),
    details: array(detailSchema, { required_error: 'Item details are required' })
        .min(1, { message: 'Item details cannot be empty' })
}).strip();

const categorySchema = object({
    id: string({ required_error: 'Category ID is required' })
        .min(1, { message: 'Category ID cannot be empty' })
        .refine(value => !isNaN(Number(value)), { message: 'Category ID must be a string that can be parsed into a number' }),
    category_name: string({ required_error: 'Category name is required' })
}).strip();

export const warehouseSchema = object({
    body: object({
        code: number().optional(),
        message: string().optional(),
        items: array(itemSchema, { required_error: 'Items are required' }),
        categories: array(categorySchema, { required_error: 'Categories are required' })
    }).strip()
});