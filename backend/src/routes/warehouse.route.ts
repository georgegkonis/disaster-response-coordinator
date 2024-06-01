import { deserializeUser } from '../middleware/deserialize-user.middleware';
import { requireUser } from '../middleware/require-user.middleware';
import express from 'express';
import { restrictTo } from '../middleware/restrict-to.middleware';
import { Role } from '../enums/role.enum';
import {
    createCategoryHandler,
    createItemHandler,
    deleteAllCategoriesAndItemsHandler,
    deleteCategoriesHandler,
    deleteCategoryHandler,
    deleteItemHandler,
    deleteItemsHandler,
    getCategoriesHandler,
    getItemsHandler, updateCategoryHandler,
    updateItemHandler,
    uploadCategoriesAndItemsHandler
} from '../controllers/warehouse.controller';
import { parseJsonData } from '../middleware/parse-json-data.middleware';
import {
    createCategorySchema,
    createItemSchema,
    updateCategorySchema,
    updateItemSchema,
    warehouseJsonSchema
} from '../schemas/warehouse.schema';
import { validate } from '../middleware/validate.middleware';

const router = express.Router();

router.use(deserializeUser, requireUser);

// Upload categories and items
router.put('/upload', restrictTo(Role.ADMIN), parseJsonData, validate(warehouseJsonSchema), uploadCategoriesAndItemsHandler);

// Add category
router.post('/categories', restrictTo(Role.ADMIN), validate(createCategorySchema), createCategoryHandler);

// Add item
router.post('/items', restrictTo(Role.ADMIN), validate(createItemSchema), createItemHandler);

// Get categories
router.get('/categories', getCategoriesHandler);

// Get items
router.get('/items', getItemsHandler);

// Update category
router.patch('/categories/:id', restrictTo(Role.ADMIN), validate(updateCategorySchema), updateCategoryHandler);

// Update item
router.patch('/items/:id', restrictTo(Role.ADMIN), validate(updateItemSchema), updateItemHandler);

// Delete category
router.delete('/categories/:id', restrictTo(Role.ADMIN), deleteCategoryHandler);

// Delete item
router.delete('/items/:id', restrictTo(Role.ADMIN), deleteItemHandler);

// Delete categories
router.delete('/categories', restrictTo(Role.ADMIN), deleteCategoriesHandler);

// Delete items
router.delete('/items', restrictTo(Role.ADMIN), deleteItemsHandler);

// Delete all categories and items
router.delete('/', restrictTo(Role.ADMIN), deleteAllCategoriesAndItemsHandler);

export default router;