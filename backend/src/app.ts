import config from './config/config';
import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: config.ORIGIN,
    credentials: true,
  }),
);
app.use(cookieParser());

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello World!');
});

import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);

export default app;
