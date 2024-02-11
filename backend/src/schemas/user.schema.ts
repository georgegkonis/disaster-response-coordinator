import { number, object, string, TypeOf, z } from 'zod';
import { passCharsCheck } from '../utils/checks';
import { Role } from '../enums/role.enum';

const userDetailsShape = object({
    firstName: string()
        .min(2, 'First name must be more than 2 characters')
        .max(32, 'First name must be less than 32 characters')
        .optional(),
    lastName: string()
        .min(2, 'Last name must be more than 2 characters')
        .max(32, 'Last name must be less than 32 characters')
        .optional(),
    phoneNumber: string()
        .min(10, 'Phone number must be more than 10 characters')
        .max(16, 'Phone number must be less than 16 characters')
        .regex(/^\+?\d+$/, 'Phone number is invalid')
        .optional(),
    address: string()
}).shape;

export const createUserSchema = object({
    body: object({
        username: string({ required_error: 'Username is required' }),
        password: string({ required_error: 'Password is required' })
            .min(8, 'Password must be more than 8 characters')
            .max(32, 'Password must be less than 32 characters')
            .refine(passCharsCheck, 'Password must contain at least 1 number, 1 capital letter and 1 special character'),
        email: string({ required_error: 'Email is required' })
            .email('Invalid email'),
        role: z.enum([Role.RESCUER], { required_error: 'Role is required', invalid_type_error: 'Invalid role value' })
    }).strip()
});

export const updateUserSchema = object({
    body: object({
        username: string()
            .optional(),
        password: string()
            .min(8, 'Password must be more than 8 characters')
            .max(32, 'Password must be less than 32 characters')
            .refine(passCharsCheck, 'Password must contain at least 1 number, 1 capital letter and 1 special character')
            .optional(),
        details: object(userDetailsShape)
            .optional()
    }).strip()
});

export const updateUserLocationSchema = object({
    body: object({
        latitude: number(),
        longitude: number()
    }).strip()
});

export type CreateUserInput = TypeOf<typeof createUserSchema>['body'];
export type UpdateUserInput = TypeOf<typeof updateUserSchema>['body'];
export type UpdateUserLocationInput = TypeOf<typeof updateUserLocationSchema>['body'];