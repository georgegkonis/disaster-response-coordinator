import { number, object, string, TypeOf } from 'zod';
import { MapLocation } from '../models/map-location';

export const createItemRequestSchema = object({
    body: object({
        item: string({ required_error: 'Item ID is required' })
            .min(1, 'Item ID cannot be empty'),
        peopleCount: number({ required_error: 'Number of people is required' })
            .min(1, 'Number of people must be greater than 0'),
        description: string({ required_error: 'Description is required' })
            .min(1, 'Description cannot be empty')
    }).strip()
});

export type CreateItemRequestInput = TypeOf<typeof createItemRequestSchema>['body'] & { citizen: string, coordinates: MapLocation };