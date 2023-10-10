import { deserializeUser } from '../middleware/deserialize-user';
import { requireUser } from '../middleware/require-user';
import express from 'express';
import { restrictTo } from '../middleware/restrict-to';
import { Role } from '../enums/role.enum';
import { deleteAllStoresHandler, uploadStoresHandler } from '../controllers/store.controller';
import { parseFileToJson } from '../middleware/parse-file';
import { validateJson } from '../middleware/validate-json';
import { storeSchema } from '../schemas/store.schema';

const router = express.Router();

router.use(deserializeUser, requireUser);

router.post('/upload', restrictTo(Role.ADMIN), parseFileToJson, validateJson(storeSchema), uploadStoresHandler);

router.delete('/all', restrictTo(Role.ADMIN), deleteAllStoresHandler);

export default router;