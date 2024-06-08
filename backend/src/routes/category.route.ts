import { restrictTo } from '../middleware/restrict-to.middleware';
import { Role } from '../enums/role.enum';
import { validate } from '../middleware/validate.middleware';
import { createCategorySchema, updateCategorySchema } from '../schemas/category.schema';
import {
    createCategoryHandler,
    deleteCategoriesHandler,
    deleteCategoryHandler,
    findCategoriesHandler,
    updateCategoryHandler
} from '../controllers/category.controller';
import express from 'express';
import { deserializeUser } from '../middleware/deserialize-user.middleware';
import { requireUser } from '../middleware/require-user.middleware';

const router = express.Router();

router.use(deserializeUser, requireUser);

// Find categories
router.get('/', findCategoriesHandler);

// Create category
router.post('/', restrictTo(Role.ADMIN), validate(createCategorySchema), createCategoryHandler);

// Update category
router.patch('/:id', restrictTo(Role.ADMIN), validate(updateCategorySchema), updateCategoryHandler);

// Delete category
router.delete('/:id', restrictTo(Role.ADMIN), deleteCategoryHandler);

// Delete categories
router.delete('/', restrictTo(Role.ADMIN), deleteCategoriesHandler);

export default router;