import express from 'express';
import { requireUser } from '../middleware/require-user';
import { deserializeUser } from '../middleware/deserialize-user';
import { restrictTo } from '../middleware/restrict-to';
import { Role } from '../enums/role.enum';
import {
    createOfferHandler,
    deleteOfferHandler,
    getOfferHandler,
    getOffersHandler,
    rateOfferHandler
} from '../controllers/offer.controller';

const router = express.Router();

router.use(deserializeUser, requireUser);

router.get('/', getOffersHandler);

router.post('/', createOfferHandler);

router.get('/:id', getOfferHandler);

router.patch('/:id/rate', rateOfferHandler);

router.delete('/:id', restrictTo(Role.ADMIN), deleteOfferHandler);

export default router;