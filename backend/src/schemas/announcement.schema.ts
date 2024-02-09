import { array, object, string, TypeOf } from 'zod';
import { isValidObjectId } from 'mongoose';
import { Item } from '../models/item.model';
import { Ref } from '@typegoose/typegoose';

const itemSchema = string().refine(isValidObjectId, { message: 'Invalid item ID' });
export const createAnnouncementSchema = object({
    body: object({
        items: array(itemSchema, { required_error: 'Items are required' })
            .min(1, 'At least 1 item is required')
            .refine(items => items.length === new Set(items).size, { message: 'Duplicate items are not allowed' })
    }).strip()
});

export type CreateAnnouncementInput = TypeOf<typeof createAnnouncementSchema>['body'] & { items: Ref<Item>[] }