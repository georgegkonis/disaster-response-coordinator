import { array, object, string, TypeOf } from 'zod';
import { isValidObjectId } from 'mongoose';
import { Item } from '../models/item.model';
import { Ref } from '@typegoose/typegoose';

const duplicateItemsCheck = (items: string[]): boolean => items.length === new Set(items).size;

export const createAnnouncementSchema = object({
    body: object({
        description: string().min(1).max(255),
        items: array(
            string().refine(isValidObjectId, 'Invalid ID format')
        ).min(1).refine(duplicateItemsCheck, 'Duplicate values are not allowed')
    }).strip()
});

export type CreateAnnouncementInput = TypeOf<typeof createAnnouncementSchema>['body'] & { items: Ref<Item>[] }