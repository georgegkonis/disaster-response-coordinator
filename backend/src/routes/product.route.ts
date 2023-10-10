import { uploadProductsHandler } from '../controllers/product.controller';
import { deserializeUser } from '../middleware/deserialize-user';
import { requireUser } from '../middleware/require-user';
import express from 'express';
import { restrictTo } from '../middleware/restrict-to';
import { Role } from '../enums/role.enum';
import { parseFileToJson } from '../middleware/parse-file';
import { validateJson } from '../middleware/validate-json';
import { productSchema } from '../schemas/product.schema';

const router = express.Router();

router.use(deserializeUser, requireUser);

router.post('/upload', restrictTo(Role.ADMIN), parseFileToJson, validateJson(productSchema), uploadProductsHandler);

export default router;