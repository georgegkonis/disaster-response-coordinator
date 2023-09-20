import { omit } from 'lodash';
import { FilterQuery, QueryOptions } from 'mongoose';
import config from 'config';
import userModel, { User } from '../models/user.model';
import { excludedFields } from '../controllers/auth.controller';
import { signJwt } from '../utils/jwt';
import redisClient from '../config/redis.config';
import { DocumentType } from '@typegoose/typegoose';
import { SignOptions } from 'jsonwebtoken';

/**
 * CreateUser service
 */
export const createUser = async (input: Partial<User>) => {
    const user = await userModel.create(input);
    return omit(user.toJSON(), excludedFields);
};

/**
 * Find user by id
 * @param id
 */
export const findUserById = async (id: string) => {
    const user = userModel.findById(id).lean();
    return omit(user, excludedFields);
};

/**
 * Find All users
 */
export const findAllUsers = async () => {
    return userModel.find();
};

/**
 * Find one user by any fields
 */
export const findUser = async (
    query: FilterQuery<User>,
    options: QueryOptions = {}
) => {
    return userModel.findOne(query, {}, options).select('+password');
};

/**
 * Sign Token
 * @param user
 */
export const signToken = async (user: DocumentType<User>) => {
    let payload: Object = { sub: user._id };
    let options: SignOptions = { expiresIn: `${config.get<number>('accessTokenExpiresIn')}m` };

    const accessToken: string = signJwt(payload, options);

    // Convert the ObjectId to a string
    redisClient.set(user._id.toString(), JSON.stringify(user), { EX: 60 * 60 });

    // Return access token
    return { accessToken };
};


