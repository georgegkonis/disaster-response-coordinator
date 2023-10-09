import express from 'express';
import {
    deleteUserHandler,
    getAllUsersHandler,
    getMeHandler,
    getUserHandler,
    updateMeHandler
} from '../controllers/user.controller';
import { deserializeUser } from '../middleware/deserialize-user';
import { requireUser } from '../middleware/require-user';
import { restrictTo } from '../middleware/restrict-to';
import { Role } from '../enums/role.enum';
import { validate } from '../middleware/validate';
import { updateUserSchema } from '../schemas/user.schema';

const router = express.Router();

router.use(deserializeUser, requireUser);

router.get('/', restrictTo(Role.ADMIN), getAllUsersHandler);

router.get('/me', getMeHandler);

router.patch('/me', validate(updateUserSchema), updateMeHandler);

router.get('/:id', restrictTo(Role.ADMIN), getUserHandler);

router.delete('/:id', restrictTo(Role.ADMIN), deleteUserHandler);

export default router;

