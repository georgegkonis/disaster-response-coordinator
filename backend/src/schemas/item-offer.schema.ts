import { number, object, string, TypeOf, z } from 'zod';
import { isValidObjectId } from 'mongoose';
import { User } from '../models/user.model';
import { Ref } from '@typegoose/typegoose';
import { TaskStatus } from '../enums/task-status.enum';
import { Item } from '../models/item.model';

export const createItemOfferSchema = object({
    body: object({
        item: string().refine(isValidObjectId, 'Invalid ID format'),
        quantity: number().min(1)
    }).strip()
});

export const updateItemOfferStatusSchema = object({
    params: object({
        id: string().refine(isValidObjectId, 'Invalid ID format')
    }),

    body: object({
        status: z.enum([TaskStatus.ACCEPTED, TaskStatus.COMPLETED, TaskStatus.PENDING])
    }).strip()
});

export type CreateItemOfferInput = TypeOf<typeof createItemOfferSchema>['body'] & { item: Ref<Item>, citizen: Ref<User> };
export type UpdateItemOfferStatusInput = TypeOf<typeof updateItemOfferStatusSchema>['body'];