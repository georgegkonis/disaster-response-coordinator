import { object, string, TypeOf } from 'zod';

const passCharsCheck: any = (pass: string) => /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,32}$/.test(pass);

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
        .regex(/^\+?[0-9]+$/, 'Phone number must contain only numbers')
        .optional(),
    address: string()
        .min(1, 'Address cannot be empty')
        .max(256, 'Address must be less than 256 characters')
        .optional()
}).shape;

export const registerUserSchema = object({
    body: object({
        username: string({ required_error: 'Username is required' }),
        password: string({ required_error: 'Password is required' })
            .min(8, 'Password must be more than 8 characters')
            .max(32, 'Password must be less than 32 characters')
            .refine(passCharsCheck, 'Password must contain at least 1 number, 1 capital letter and 1 special character'),
        passwordConfirm: string({ required_error: 'Please confirm your password' }),
        email: string({ required_error: 'Email is required' })
            .email('Invalid email')
    }).strip().refine((data) => data.password === data.passwordConfirm, {
        path: ['passwordConfirm'],
        message: 'Passwords do not match'
    })
});

export const loginUserSchema = object({
    body: object({
        username: string({ required_error: 'Username is required' }),
        password: string({ required_error: 'Password is required' })
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

export type CreateUserInput = TypeOf<typeof registerUserSchema>['body'];
export type LoginUserInput = TypeOf<typeof loginUserSchema>['body'];
export type UpdateUserInput = TypeOf<typeof updateUserSchema>['body'];
