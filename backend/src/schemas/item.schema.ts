import { array, number, object, string, TypeOf } from 'zod';
import { isValidObjectId } from 'mongoose';
import { Ref } from '@typegoose/typegoose';
import { Category } from '../models/category.model';

const detailShape = object({
    name: string().min(1),
    value: string().min(1)
}).strip();

export const createItemSchema = object({
    body: object({
        name: string().min(1),
        category: string().refine(isValidObjectId, 'Invalid ID format'),
        quantity: number().min(0).optional(),
        details: array(detailShape).min(1)
    }).strip()
});

export const updateItemSchema = object({
    params: object({
        id: string().refine(isValidObjectId, 'Invalid ID format')
    }).strip(),

    body: object({
        name: string().min(1).optional(),
        category: string().refine(isValidObjectId, 'Invalid ID format').optional(),
        quantity: number().min(0).optional(),
        details: array(detailShape).min(1).optional()
    }).strip()
});

export type CreateItemInput = TypeOf<typeof createItemSchema>['body'] & { code: number, category: Ref<Category> };
export type UpdateItemInput = TypeOf<typeof updateItemSchema>['body'] & { category?: Ref<Category> };