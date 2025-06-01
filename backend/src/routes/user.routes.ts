import express from 'express';
import { authenticateToken, isAdmin } from '../middlewares/auth.middleware';
import { getAllUsers } from '../controllers/user.controller';

const router = express.Router();

router.use(authenticateToken);

router.get('/', isAdmin, getAllUsers);

export default router;
