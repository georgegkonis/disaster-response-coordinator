import express from 'express';
import { deserializeUser } from '../middleware/deserialize-user.middleware';
import { requireUser } from '../middleware/require-user.middleware';
import { createHeadquartersHandler, deleteHeadquartersHandler, getHeadquartersHandler } from '../controllers/headquarters.controller';
import { Role } from '../enums/role.enum';
import { restrictTo } from '../middleware/restrict-to.middleware';
import { validate } from '../middleware/validate.middleware';
import { createHeadquartersSchema } from '../schemas/headquarters.schema';

const router = express.Router();

router.use(deserializeUser, requireUser);

// Create headquarters
router.post('/', restrictTo(Role.ADMIN), validate(createHeadquartersSchema), createHeadquartersHandler);

// Get headquarters
router.get('/', getHeadquartersHandler);

// Delete headquarters
router.delete('/:id', restrictTo(Role.ADMIN), deleteHeadquartersHandler);

export default router;