import { object, string, TypeOf } from 'zod';
import { isValidObjectId } from 'mongoose';

export const createCategorySchema = object({
    body: object({
        name: string().min(1)
    }).strip()
});

export const updateCategorySchema = object({
    params: object({
        id: string().refine(isValidObjectId, 'Invalid ID format')
    }).strip(),

    body: object({
        name: string().min(1)
    }).strip()
});

export type CreateCategoryInput = TypeOf<typeof createCategorySchema>['body'] & { code: number };
export type UpdateCategoryInput = TypeOf<typeof updateCategorySchema>['body'];