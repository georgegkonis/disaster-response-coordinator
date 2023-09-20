import express from 'express';
import {
    deleteUserHandler,
    getAllUsersHandler,
    getMeHandler,
    getUserHandler,
    updateUserHandler
} from '../controllers/user.controller';
import { deserializeUser } from '../middleware/deserialize-user';
import { requireUser } from '../middleware/require-user';
import { restrictTo } from '../middleware/restrict-to';

const router = express.Router();

router.use(deserializeUser, requireUser);

router.get('/', restrictTo('admin'), getAllUsersHandler);

router.get('/me', getMeHandler);

router.get('/:id', getUserHandler);

router.patch('/:id', updateUserHandler);

router.delete('/:id', deleteUserHandler);

export default router;

