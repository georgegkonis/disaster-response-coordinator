import { deserializeUser } from '../middleware/deserialize-user.middleware';
import { requireUser } from '../middleware/require-user.middleware';
import express from 'express';
import { restrictTo } from '../middleware/restrict-to.middleware';
import { Role } from '../enums/role.enum';
import { clearDataHandler, exportDataHandler, importDataHandler } from '../controllers/warehouse.controller';
import { parseJsonData } from '../middleware/parse-json-data.middleware';
import { warehouseDataSchema } from '../schemas/warehouse.schema';
import { validate } from '../middleware/validate.middleware';

const router = express.Router();

router.use(deserializeUser, requireUser);

// Import warehouse data
router.put('/import', restrictTo(Role.ADMIN), parseJsonData, validate(warehouseDataSchema), importDataHandler);

// Export warehouse data
router.get('/export', restrictTo(Role.ADMIN), exportDataHandler);

// Delete warehouse data
router.delete('/', restrictTo(Role.ADMIN), clearDataHandler);

export default router;