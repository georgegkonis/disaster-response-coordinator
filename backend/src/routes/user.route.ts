import express from 'express';
import {
    deleteMeHandler,
    deleteUserHandler,
    getAllUsersHandler,
    getMeHandler,
    getUserHandler,
    updateMeHandler
} from '../controllers/user.controller';
import { deserializeUser } from '../middleware/deserialize-user.middleware';
import { requireUser } from '../middleware/require-user.middleware';
import { restrictTo } from '../middleware/restrict-to.middleware';
import { Role } from '../enums/role.enum';
import { validate } from '../middleware/validate.middleware';
import { updateUserSchema } from '../schemas/user.schema';

const router = express.Router();

router.use(deserializeUser, requireUser);

// Get all users
router.get('/', restrictTo(Role.ADMIN), getAllUsersHandler);

// Get current user
router.get('/me', getMeHandler);

// Update current user
router.patch('/me', validate(updateUserSchema), updateMeHandler);

// Delete current user
router.delete('/me', deleteMeHandler);

// Get user by id
router.get('/:id', restrictTo(Role.ADMIN), getUserHandler);

// Delete user by id
router.delete('/:id', restrictTo(Role.ADMIN), deleteUserHandler);

export default router;

