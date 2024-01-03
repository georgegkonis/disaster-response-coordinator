import redisClient from '../config/redis.config';
import { User } from '../models/user.model';

export function setUserCache(id: string, user: User): void {
    redisClient.set(id, JSON.stringify(user), { EX: 60 * 60 })
        .then(() => console.log('User data updated in Redis for user:', id))
        .catch(err => console.error('Error updating user data in Redis:', err));
}

export function setUserCacheIfExists(id: string, user: User): void {
    redisClient.exists(id)
        .then(exists => { if (exists) setUserCache(id, user); })
        .catch(err => console.error('Error checking if user exists in Redis:', err));
}

export function deleteUserCache(id: string): void {
    redisClient.del(id)
        .then(() => console.log('User data removed from Redis for user:', id))
        .catch(err => console.error('Error removing user data from Redis:', err));
}