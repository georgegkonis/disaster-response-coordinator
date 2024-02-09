import { number, object, TypeOf } from 'zod';

export const createHeadquartersSchema = object({
    body: object({
        location: object({
            latitude: number(),
            longitude: number()
        })
    }).strip()
});

export type CreateHeadquartersInput = TypeOf<typeof createHeadquartersSchema>['body'];