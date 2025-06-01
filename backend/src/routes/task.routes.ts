import express from 'express';
import { authenticateToken, isAdmin } from '../middlewares/auth.middleware';
import { createTask, getTasks } from '../controllers/tasks.controller';

const router = express.Router();

router.use(authenticateToken);

router.get('/:id', getTasks);
router.post('/create-task', isAdmin, createTask);

export default router;
