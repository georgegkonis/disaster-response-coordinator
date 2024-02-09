import { number, object, string, TypeOf, z } from 'zod';
import { isValidObjectId } from 'mongoose';
import { User } from '../models/user.model';
import { Ref } from '@typegoose/typegoose';
import { TaskStatus } from '../enums/task-status.enum';
import { Item } from '../models/item.model';

export const createItemOfferSchema = object({
    body: object({
        item: string({ required_error: 'Item ID is required' })
            .refine(isValidObjectId, 'Invalid item ID'),
        quantity: number({ required_error: 'Quantity is required' })
            .min(1, 'Quantity must be greater than 0')
    }).strip()
});

export const updateItemOfferStatusSchema = object({
    params: object({
        id: string({ required_error: 'Item offer ID is required' })
            .refine(isValidObjectId, 'Invalid item offer ID')
    }),
    body: object({
        status: z.enum([TaskStatus.ACCEPTED, TaskStatus.COMPLETED, TaskStatus.PENDING], { required_error: 'Status is required' })
    }).strip()
});

export type CreateItemOfferInput = TypeOf<typeof createItemOfferSchema>['body'] & { item: Ref<Item>, citizen: Ref<User> };

export type UpdateItemOfferStatusInput = TypeOf<typeof updateItemOfferStatusSchema>['body'] & { rescuer: Ref<User>, acceptedAt?: Date };