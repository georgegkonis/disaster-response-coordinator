import { array, number, object, string, TypeOf } from 'zod';

const detailShape = object({
    detail_name: string(),
    detail_value: string()
}).strip();

const itemShape = object({
    id: string().min(1).refine(value => !isNaN(Number(value)), 'Item ID must be a string that can be parsed into a number'),
    name: string(),
    category: string().min(1).refine(value => !isNaN(Number(value)), 'Item category must be a string that can be parsed into a number'),
    details: array(detailShape).min(1)
}).strip();

const categoryShape = object({
    id: string().min(1).refine(value => !isNaN(Number(value)), 'Category ID must be a string that can be parsed into a number'),
    category_name: string()
}).strip();

export const warehouseDataSchema = object({
    body: object({
        code: number().optional(),
        message: string().optional(),
        items: array(itemShape),
        categories: array(categoryShape)
    }).strip()
});

export type WarehouseJsonInput = TypeOf<typeof warehouseDataSchema>['body'];
