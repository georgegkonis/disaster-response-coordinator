import express from 'express';
import { loginHandler, registerHandler } from '../controllers/auth.controller';
import { validate } from '../middleware/validate';
import { registerUserSchema, loginUserSchema } from '../schemas/user.schema';

const router = express.Router();

// Register user route
router.post('/register', validate(registerUserSchema), registerHandler);

// Login user route
router.post('/login', validate(loginUserSchema), loginHandler);

export default router;
