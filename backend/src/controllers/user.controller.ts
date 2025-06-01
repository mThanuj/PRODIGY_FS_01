import { Request, Response } from 'express';
import User, { IUser } from '../models/user.model';

export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users: IUser[] = await User.find().select('-password').where({
      role: 'user',
    });

    res.status(200).json({ users });
  } catch (error) {
    console.error('Error getting all users:', error);
    res.status(500).json({ error: 'Error getting all users' });
  }
};
