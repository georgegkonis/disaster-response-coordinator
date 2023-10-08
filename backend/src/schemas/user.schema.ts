import { object, string, TypeOf } from 'zod';

const passCharsCheck: any = (pass: string) => /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,32}$/.test(pass);

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
    }).refine((data) => data.password === data.passwordConfirm, {
        path: ['passwordConfirm'],
        message: 'Passwords do not match'
    })
});

export const loginUserSchema = object({
    body: object({
        username: string({ required_error: 'Username is required' }),
        password: string({ required_error: 'Password is required' })
    })
});

export const updateUserSchema = object({
    body: object({
        username: string()
            .optional(),
        email: string()
            .email('Invalid email')
            .optional(),
        password: string()
            .min(8, 'Password must be more than 8 characters')
            .max(32, 'Password must be less than 32 characters')
            .refine(passCharsCheck, 'Password must contain at least 1 number, 1 capital letter and 1 special character')
            .optional()
    })
});

export type CreateUserInput = TypeOf<typeof registerUserSchema>['body'];
export type LoginUserInput = TypeOf<typeof loginUserSchema>['body'];
export type UpdateUserInput = TypeOf<typeof updateUserSchema>['body'];
