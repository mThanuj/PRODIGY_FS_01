import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello World!');
});

import authRoutes from './routes/auth.routes';

app.use('/api/v1/auth', authRoutes);

export default app;
