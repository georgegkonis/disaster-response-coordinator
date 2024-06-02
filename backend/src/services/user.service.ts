import { FilterQuery, ProjectionFields, QueryOptions } from 'mongoose';
import userModel, { User } from '../models/user.model';
import NotFoundError from '../errors/not-found-error';
import bcrypt from 'bcryptjs';

export const createUser = async (
    input: User
) => {
    input.password = await encryptPassword(input.password);

    const user: User = await userModel.create<User>(input);

    return user;
};

export const getUser = async (
    id: string
) => {
    const user: User | null = await userModel.findById<User>(id);

    if (!user) throw new NotFoundError('user', id);

    return user;
};

export const findUser = async (
    query: FilterQuery<User>,
    projection: ProjectionFields<User> = {},
    options: QueryOptions = {}
) => {
    const user: User | null = await userModel.findOne<User>(query, projection, options);

    return user;
};

export const findUsers = async (
    query: FilterQuery<User> = {},
    options: QueryOptions = {}
) => {
    const users: User[] = await userModel.find<User>(query, {}, options);

    return users;
};

export const updateUser = async (
    id: string,
    input: Partial<User>
) => {
    if (input.password) input.password = await encryptPassword(input.password);

    const user: User | null = await userModel.findByIdAndUpdate<User>(id, input, { new: true });

    if (!user) throw new NotFoundError('user', id);

    return user;
};

export const deleteUser = async (
    id: string
) => {
    await userModel.findByIdAndDelete<User>(id);
};

export async function comparePasswords(hashedPassword: string, candidatePassword: string) {
    return await bcrypt.compare(candidatePassword, hashedPassword);
}

async function encryptPassword(password: string) {
    return await bcrypt.hash(password, 10);
}
