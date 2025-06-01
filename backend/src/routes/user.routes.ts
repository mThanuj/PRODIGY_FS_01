import express from 'express';
import { authenticateToken } from '../middlewares/auth.middleware';
import { getAllUsers } from '../controllers/user.controller';

const router = express.Router();

router.use(authenticateToken);

router.get('/', getAllUsers);

export default router;
