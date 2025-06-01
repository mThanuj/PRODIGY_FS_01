import { Request, Response } from 'express';
import User from '../models/user.model';
import bcrypt from 'bcryptjs';

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400).json({ error: 'Name, email, and password are required' });
      return;
    }

    const userExists = await User.findOne({ $or: [{ name }, { email }] });

    if (userExists) {
      res.status(400).json({ error: 'User already exists' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (!user) {
      res.status(500).json({ error: 'Error creating user' });
      return;
    }

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Error registering user' });
  }
};

export const login = async (req: Request, res: Response) => {};
