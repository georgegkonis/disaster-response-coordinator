import { number, object, string, TypeOf, z } from 'zod';
import { isValidObjectId } from 'mongoose';
import { TaskStatus } from '../enums/task-status.enum';
import { Ref } from '@typegoose/typegoose';
import { User } from '../models/user.model';
import { Item } from '../models/item.model';

export const createItemRequestSchema = object({
    body: object({
        item: string().refine(isValidObjectId, 'Invalid ID format'),
        peopleCount: number().min(1)
    }).strip()
});

export const updateItemRequestStatusSchema = object({
    params: object({
        id: string().refine(isValidObjectId, 'Invalid ID format')
    }),

    body: object({
        status: z.enum([TaskStatus.ACCEPTED, TaskStatus.COMPLETED, TaskStatus.PENDING])
    }).strip()
});

export type CreateItemRequestInput = TypeOf<typeof createItemRequestSchema>['body'] & { item: Ref<Item>, citizen: Ref<User> };
export type UpdateItemRequestStatusInput = TypeOf<typeof updateItemRequestStatusSchema>['body'] & { rescuer: Ref<User>, acceptedAt?: Date };