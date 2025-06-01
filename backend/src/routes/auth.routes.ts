import express, { Request, Response } from 'express';
import { login, logout, register } from '../controllers/auth.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', authenticateToken, logout);
router.get('/check-auth', authenticateToken, (req: Request, res: Response) => {
  res.json({
    message: 'User is authenticated',
    user: req.user,
  });
});

export default router;
