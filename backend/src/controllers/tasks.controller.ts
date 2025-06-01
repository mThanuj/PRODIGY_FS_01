import { Request, Response } from 'express';
import Task, { ITask } from '../models/task.model';

export const getTasks = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (req.user instanceof Object && req.user!.role !== 'admin') {
      if (req.user.userId !== id) {
        res
          .status(403)
          .json({ error: 'You are not authorized to view this user' });
        return;
      }
    }

    const tasks: ITask[] = await Task.find({
      user: id,
    }).sort({ createdAt: -1 });

    res.status(200).json({ tasks });
  } catch (error) {
    console.error('Error getting tasks:', error);
    res.status(500).json({ error: 'Error getting tasks' });
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description, user } = req.body;
    const task: ITask = await Task.create({
      title,
      description,
      user,
    });

    res.status(201).json({ task });
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'Error creating task' });
  }
};
