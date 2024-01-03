import { User } from '../models/user.model';
import { SignOptions } from 'jsonwebtoken';
import config from 'config';
import { signJwt } from '../utils/jwt';
import { setUserCache } from './cache.service';

export const signToken = async (user: User) => {
    const payload: Object = { sub: user._id };
    const options: SignOptions = { expiresIn: `${config.get<number>('accessTokenExpiresIn')}m` };

    const accessToken: string = signJwt(payload, options);

    setUserCache(user._id.toString(), user);

    return { accessToken };
};