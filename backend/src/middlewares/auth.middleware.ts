import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';
import config from '../config/config';

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies.token;

  if (!token) {
    res.sendStatus(401);
    return;
  }

  jwt.verify(
    token,
    config.JWT_SECRET,
    (err: VerifyErrors | null, decoded: string | JwtPayload | undefined) => {
      if (err) {
        res.sendStatus(403);
        return;
      }
      req.user = decoded;
      next();
    },
  );
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user;

  if (!user) {
    res.sendStatus(403);
    return;
  }

  if (user instanceof String) {
    res.sendStatus(403);
    return;
  }

  if (user instanceof Object && user.role === 'admin') {
    next();
  } else {
    res.sendStatus(403);
  }
};
