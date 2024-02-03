import { User } from '../models/user.model';
import { SignOptions } from 'jsonwebtoken';
import config from 'config';
import { signJwt } from '../utils/jwt';
import { setUserCache } from './cache.service';
import { omit } from 'lodash';

export const signToken = async (user: User) => {
    const userWithoutPassword = omit<User>(user, ['_doc.password']);
    const payload: Object = { sub: userWithoutPassword._id, user: userWithoutPassword };
    const options: SignOptions = { expiresIn: `${config.get<number>('accessTokenExpiresIn')}m` };

    const accessToken: string = signJwt(payload, options);

    setUserCache(user._id!.toString(), userWithoutPassword);

    return { accessToken };
};