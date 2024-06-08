import express from 'express';
import { deserializeUser } from '../middleware/deserialize-user.middleware';
import { requireUser } from '../middleware/require-user.middleware';
import { restrictTo } from '../middleware/restrict-to.middleware';
import { Role } from '../enums/role.enum';
import { validate } from '../middleware/validate.middleware';
import { createItemSchema, updateItemSchema } from '../schemas/item.schema';
import {
    createItemHandler,
    deleteItemHandler,
    deleteItemsHandler,
    findItemsHandler,
    updateItemHandler
} from '../controllers/item.controller';

const router = express.Router();

router.use(deserializeUser, requireUser);

// Get items
router.get('/', findItemsHandler);

// Add item
router.post('/', restrictTo(Role.ADMIN), validate(createItemSchema), createItemHandler);

// Update item
router.patch('/:id', restrictTo(Role.ADMIN), validate(updateItemSchema), updateItemHandler);

// Delete item
router.delete('/:id', restrictTo(Role.ADMIN), deleteItemHandler);

// Delete items
router.delete('/', restrictTo(Role.ADMIN), deleteItemsHandler);

export default router;