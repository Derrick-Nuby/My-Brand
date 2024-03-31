import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const jwtSecret = process.env.JWT_SECRET || 'defaultSecret';


declare global {
  namespace Express {
    interface Request {
      userId?: string; // Define the userId property as optional
      isAdmin?: boolean;
    }
  }
}

const userAuthJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, 'jwtSecret', (err: any, decoded: any) => {
      if (err) {
        return res.status(403).json({ message: 'Failed to authenticate token' });
      }
      const { id, username, email } = decoded;
      req.userId = id;
      req.isAdmin = decoded.isAdmin;
      next();
    });
  } else {
    res.status(401).json({ message: 'No token provided' });
  }
};

const adminAuthJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, 'jwtSecret', (err: any, decoded: any) => {
      if (err) {
        return res.status(403).json({ message: 'Failed to authenticate token' });
      }
      const { id, username, email, isAdmin } = decoded;
      req.userId = id;
      req.isAdmin = isAdmin;

      if (!isAdmin) {
        return res.status(403).json({ message: 'You are not allowed to access this resource, Please contact the site administrator for assistance' });
      }
      next();
    });
  } else {
    res.status(401).json({ message: 'No token provided' });
  }
};

export { userAuthJWT, adminAuthJWT };
