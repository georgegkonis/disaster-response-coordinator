import express from 'express';
import { deserializeUser } from '../middleware/deserialize-user.middleware';
import { requireUser } from '../middleware/require-user.middleware';
import { restrictTo } from '../middleware/restrict-to.middleware';
import { Role } from '../enums/role.enum';
import { validate } from '../middleware/validate.middleware';
import { createItemOfferSchema, updateItemOfferStatusSchema } from '../schemas/item-offer.schema';
import {
    createItemOfferHandler,
    deleteItemOfferHandler,
    getItemOffersHandler,
    getMyItemOffersHandler,
    updateItemOfferStatusHandler
} from '../controllers/item-offer.controller';

const router = express.Router();

router.use(deserializeUser, requireUser);

// Create item offer
router.post('/', restrictTo(Role.CITIZEN), validate(createItemOfferSchema), createItemOfferHandler);

// Get item offers
router.get('/', restrictTo(Role.ADMIN, Role.RESCUER), getItemOffersHandler);

// Get current user's item offers
router.get('/me', restrictTo(Role.CITIZEN), getMyItemOffersHandler);

// Update item offer status
router.patch('/:id/status', restrictTo(Role.RESCUER), validate(updateItemOfferStatusSchema), updateItemOfferStatusHandler);

// Delete item offer
router.delete('/:id', restrictTo(Role.CITIZEN), deleteItemOfferHandler);

export default router;