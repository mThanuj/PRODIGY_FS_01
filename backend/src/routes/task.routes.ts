import express from 'express';
import { authenticateToken, isAdmin } from '../middlewares/auth.middleware';
import {
  completeTask,
  createTask,
  getTasks,
} from '../controllers/tasks.controller';

const router = express.Router();

router.use(authenticateToken);

router.get('/:id', getTasks);
router.post('/create-task', isAdmin, createTask);
router.patch('/complete-task/:id', completeTask);

export default router;
