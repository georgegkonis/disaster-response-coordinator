import { deserializeUser } from '../middleware/deserialize-user';
import { requireUser } from '../middleware/require-user';
import express from 'express';
import { restrictTo } from '../middleware/restrict-to';
import { Role } from '../enums/role.enum';
import {
    deleteAllCategoriesHandler,
    getCategoriesHandler,
    getCategoriesWithProductsHandler,
    uploadCategoriesHandler
} from '../controllers/category.controller';
import { parseFileToJson } from '../middleware/parse-file';
import { validateJson } from '../middleware/validate-json';
import { categoryJsonSchema } from '../schemas/category-json.schema';

const router = express.Router();

router.use(deserializeUser, requireUser);

router.get('/', getCategoriesHandler)

router.post('/upload', restrictTo(Role.ADMIN), parseFileToJson, validateJson(categoryJsonSchema), uploadCategoriesHandler);

router.delete('/all', restrictTo(Role.ADMIN), deleteAllCategoriesHandler);

router.get('/with-products', getCategoriesWithProductsHandler)

export default router;