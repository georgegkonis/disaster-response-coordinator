import { deserializeUser } from '../middleware/deserialize-user.middleware';
import { requireUser } from '../middleware/require-user.middleware';
import express from 'express';
import { restrictTo } from '../middleware/restrict-to.middleware';
import { Role } from '../enums/role.enum';
import {
    deleteAllCategoriesAndItemsHandler,
    getCategoriesHandler,
    getItemsHandler,
    uploadCategoriesAndItemsHandler
} from '../controllers/warehouse.controller';
import { parseJsonData } from '../middleware/parse-json-data.middleware';
import { warehouseSchema } from '../schemas/warehouse.schema';
import { validate } from '../middleware/validate.middleware';

const router = express.Router();

router.use(deserializeUser, requireUser);

router.get('/categories', getCategoriesHandler);

router.get('/items', getItemsHandler);

router.post('/upload', restrictTo(Role.ADMIN), parseJsonData, validate(warehouseSchema), uploadCategoriesAndItemsHandler);

router.delete('/', restrictTo(Role.ADMIN), deleteAllCategoriesAndItemsHandler);

export default router;