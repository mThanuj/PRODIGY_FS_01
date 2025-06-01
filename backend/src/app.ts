import express, { Request, Response } from 'express';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello World!');
});

import authRoutes from './routes/auth.routes';

app.use('/api/v1/auth', authRoutes);

export default app;
