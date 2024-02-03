import { object, string, TypeOf } from 'zod';
import { passCharsCheck } from '../utils/checks';

export const registerSchema = object({
    body: object({
        username: string({ required_error: 'Username is required' }),
        password: string({ required_error: 'Password is required' })
            .min(8, 'Password must be more than 8 characters')
            .max(32, 'Password must be less than 32 characters')
            .refine(passCharsCheck, 'Password must contain at least 1 number, 1 capital letter and 1 special character'),
        passwordConfirm: string({ required_error: 'Please confirm your password' }),
        email: string({ required_error: 'Email is required' })
            .email('Invalid email')
    }).strip()
        .refine((data) => data.password === data.passwordConfirm, {
            path: ['passwordConfirm'],
            message: 'Passwords do not match'
        })
});

export const loginSchema = object({
    body: object({
        username: string({ required_error: 'Username is required' }),
        password: string({ required_error: 'Password is required' })
    }).strip()
});

export type RegisterInput = TypeOf<typeof registerSchema>['body'];
export type LoginInput = TypeOf<typeof loginSchema>['body'];
