import { deserializeUser } from '../middleware/deserialize-user';
import { requireUser } from '../middleware/require-user';
import express from 'express';
import { restrictTo } from '../middleware/restrict-to';
import { Role } from '../enums/role.enum';
import { deleteAllStoresHandler, getStoresHandler, uploadStoresHandler } from '../controllers/store.controller';
import { parseFileToJson } from '../middleware/parse-file';
import { validateJson } from '../middleware/validate-json';
import { storeJsonSchema } from '../schemas/store-json.schema';

const router = express.Router();

router.use(deserializeUser, requireUser);

router.get('/', getStoresHandler);

router.post('/upload', restrictTo(Role.ADMIN), parseFileToJson, validateJson(storeJsonSchema), uploadStoresHandler);

router.delete('/all', restrictTo(Role.ADMIN), deleteAllStoresHandler);

export default router;