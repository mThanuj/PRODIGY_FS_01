declare global {
  namespace Express {
    interface Request {
      user?: string | import('jsonwebtoken').JwtPayload | undefined;
    }
  }
}

export {};
