import express from 'express';
import { deserializeUser } from '../middleware/deserialize-user.middleware';
import { requireUser } from '../middleware/require-user.middleware';
import { createAnnouncementHandler, deleteAnnouncementHandler, getAnnouncementsHandler } from '../controllers/announcement.controller';
import { restrictTo } from '../middleware/restrict-to.middleware';
import { Role } from '../enums/role.enum';
import { validate } from '../middleware/validate.middleware';
import { createAnnouncementSchema } from '../schemas/announcement.schema';

const router = express.Router();

router.use(deserializeUser, requireUser);

// Create announcement
router.post('/', restrictTo(Role.ADMIN), validate(createAnnouncementSchema), createAnnouncementHandler);

// Get announcements
router.get('/', getAnnouncementsHandler);

// Delete announcement
router.delete('/:id', restrictTo(Role.ADMIN), deleteAnnouncementHandler);

export default router;