import { deleteAllProductsHandler, uploadProductsHandler } from '../controllers/product.controller';
import { deserializeUser } from '../middleware/deserialize-user';
import { requireUser } from '../middleware/require-user';
import express from 'express';
import { restrictTo } from '../middleware/restrict-to';
import { Role } from '../enums/role.enum';
import { parseFileToJson } from '../middleware/parse-file';
import { validateJson } from '../middleware/validate-json';
import { productJsonSchema } from '../schemas/product-json.schema';

const router = express.Router();

router.use(deserializeUser, requireUser);

router.post('/upload', restrictTo(Role.ADMIN), parseFileToJson, validateJson(productJsonSchema), uploadProductsHandler);

router.delete('/all', restrictTo(Role.ADMIN), deleteAllProductsHandler);

export default router;