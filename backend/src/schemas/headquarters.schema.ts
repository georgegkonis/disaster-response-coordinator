import { number, object, TypeOf } from 'zod';

const locationSchema = object({
    latitude: number({ required_error: 'Latitude is required' }),
    longitude: number({ required_error: 'Longitude is required' })
});

export const createHeadquartersSchema = object({
    body: object({
        location: object({
            latitude: number({ required_error: 'Latitude is required' }),
            longitude: number({ required_error: 'Longitude is required' })
        }, { required_error: 'Location is required' }),
    }).strip()
});

export type CreateHeadquartersInput = TypeOf<typeof createHeadquartersSchema>['body'];