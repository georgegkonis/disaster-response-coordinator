import { number, object, string, TypeOf } from 'zod';
import { MapLocation } from '../models/map-location';
import { isValidObjectId } from 'mongoose';
import { z } from 'zod';
import { TaskStatus } from '../enums/task-status.enum';
import { Ref } from '@typegoose/typegoose';
import { User } from '../models/user.model';
import { Item } from '../models/item.model';

export const createItemRequestSchema = object({
    body: object({
        item: string({ required_error: 'Item ID is required' })
            .refine(isValidObjectId, 'Invalid item ID'),
        description: string({ required_error: 'Description is required' })
            .min(1, 'Description cannot be empty'),
        peopleCount: number({ required_error: 'Number of people is required' })
            .min(1, 'Number of people must be greater than 0')
    }).strip()
});

export const updateItemRequestStatusSchema = object({
    params: object({
        id: string({ required_error: 'Item request ID is required' })
            .refine(isValidObjectId, 'Invalid item request ID')
    }),
    body: object({
        status: z.enum([TaskStatus.ACCEPTED, TaskStatus.COMPLETED, TaskStatus.PENDING], { required_error: 'Status is required' })
    }).strip()
});

export type CreateItemRequestInput = TypeOf<typeof createItemRequestSchema>['body'] & { item: Ref<Item>, citizen: Ref<User> };

export type UpdateItemRequestStatusInput = TypeOf<typeof updateItemRequestStatusSchema>['body'] & { rescuer: Ref<User>, acceptedAt?: Date };