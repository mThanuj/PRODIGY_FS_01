import express from 'express';
import { login, logout, register } from '../controllers/auth.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', authenticateToken, logout);

export default router;
