import { FilterQuery, QueryOptions } from 'mongoose';
import userModel, { User } from '../models/user.model';
import UserNotFoundError from '../errors/user-not-found-error';
import { RegisterInput } from '../schemas/auth.schema';
import bcrypt from 'bcryptjs';
import { CreateUserInput, UpdateUserInput } from '../schemas/user.schema';

export const createUser = async (
    input: RegisterInput | CreateUserInput
) => {
    input.password = await encryptPassword(input.password);

    await userModel.create(input);
};

export const updateUser = async (
    id: string,
    input: UpdateUserInput
) => {
    if (input.password) input.password = await encryptPassword(input.password);

    const user: User | null = await userModel.findByIdAndUpdate<User>(id, input, { new: true });

    if (!user) throw new UserNotFoundError();

    return user;
};

export const deleteUser = async (
    id: string
) => {
    await userModel.findByIdAndDelete<User>(id);
};

export const getUser = async (
    id: string,
    includePassword: boolean = false
) => {
    const user: User | null = includePassword
        ? await userModel.findById<User>(id).select('+password').exec()
        : await userModel.findById<User>(id);

    if (!user) throw new UserNotFoundError();

    return user;
};

export const findUser = async (
    query: FilterQuery<User>,
    options: QueryOptions = {},
    includePassword: boolean = false
) => {
    const user: User | null = includePassword
        ? await userModel.findOne<User>(query, {}, options).select('+password').exec()
        : await userModel.findOne<User>(query, {}, options);

    return user;
};

export const findUsers = async (
    query: FilterQuery<User> = {},
    options: QueryOptions = {}
) => {
    const users: User[] = await userModel.find<User>(query, {}, options);

    return users;
};

async function encryptPassword(password: string) {
    return await bcrypt.hash(password, 10);
}
