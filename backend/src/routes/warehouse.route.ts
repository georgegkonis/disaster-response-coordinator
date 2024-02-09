import { deserializeUser } from '../middleware/deserialize-user.middleware';
import { requireUser } from '../middleware/require-user.middleware';
import express from 'express';
import { restrictTo } from '../middleware/restrict-to.middleware';
import { Role } from '../enums/role.enum';
import {
    createCategoryHandler,
    createItemHandler,
    deleteAllCategoriesAndItemsHandler,
    getCategoriesHandler,
    getItemsHandler,
    updateItemQuantityHandler,
    uploadCategoriesAndItemsHandler
} from '../controllers/warehouse.controller';
import { parseJsonData } from '../middleware/parse-json-data.middleware';
import { createCategorySchema, createItemSchema, updateItemQuantitySchema, warehouseJsonSchema } from '../schemas/warehouse.schema';
import { validate } from '../middleware/validate.middleware';

const router = express.Router();

router.use(deserializeUser, requireUser);

// Upload categories and items
router.post('/upload', restrictTo(Role.ADMIN), parseJsonData, validate(warehouseJsonSchema), uploadCategoriesAndItemsHandler);

// Add category
router.post('/categories', restrictTo(Role.ADMIN), validate(createCategorySchema), createCategoryHandler);

// Add item
router.post('/items', restrictTo(Role.ADMIN), validate(createItemSchema), createItemHandler);

// Get categories
router.get('/categories', getCategoriesHandler);

// Get items
router.get('/items', getItemsHandler);

// Update item quantity
router.patch('/items/:id', restrictTo(Role.ADMIN), validate(updateItemQuantitySchema), updateItemQuantityHandler);

// Delete all categories and items
router.delete('/', restrictTo(Role.ADMIN), deleteAllCategoriesAndItemsHandler);

export default router;