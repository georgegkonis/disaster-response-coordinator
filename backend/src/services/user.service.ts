import { FilterQuery, QueryOptions, Types } from 'mongoose';
import userModel, { User } from '../models/user.model';
import UserNotFoundError from '../errors/user-not-found-error';
import { CreateUserInput, UpdateUserInput } from '../schemas/user.schema';
import { deleteUserCache, updateUserCache } from './cache.service';
import ObjectId = Types.ObjectId;

export const createUser = async (
    input: CreateUserInput
): Promise<User> => {
    return await userModel.create(input);
};

export const updateUser = async (
    id: string,
    input: UpdateUserInput
): Promise<User> => {
    const user = await userModel.findById(new ObjectId(id));

    if (!user) throw new UserNotFoundError();

    user.set(input);
    await user.save();

    updateUserCache(id, user);

    return user;
};

export const deleteUser = async (
    id: string
): Promise<void> => {
    await userModel.findByIdAndDelete(id);

    deleteUserCache(id);
};

export const getUser = async (
    id: string
): Promise<User> => {
    const user = await userModel.findById(id);

    if (!user) throw new UserNotFoundError();

    return user;
};

export const findUser = async (
    query: FilterQuery<User>,
    options: QueryOptions = {},
    includePassword: boolean = false
): Promise<User | null> => {
    return includePassword
        ? userModel.findOne<User>(query, {}, options).select('+password').exec()
        : userModel.findOne<User>(query, {}, options);
};

export const findUsers = async (
    query: FilterQuery<User>,
    options: QueryOptions = {}
): Promise<User[]> => {
    return userModel.find(query, {}, options);
};
