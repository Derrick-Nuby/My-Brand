import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const jwtSecret = process.env.JWT_SECRET || 'defaultSecret';


declare global {
  namespace Express {
    interface Request {
      userId?: string;
      lUsername?: string;
      isAdmin?: boolean;
    }
  }
}

const userAuthJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.jwt;
  // console.log(req.cookies.jwt);
  

  if (token) {
    jwt.verify(token, 'jwtSecret', (err: any, decoded: any) => {
      if (err) {
        return res.status(403).json({ message: 'Failed to authenticate token' });
      }
      const { id, username, isAdmin } = decoded;
      req.userId = id;
      req.lUsername = username;
      req.isAdmin = isAdmin;
      next();
    });
  } else {
    res.status(401).json({ message: 'You need to login to access this resource; Please login or create an account' });
  }
};

const adminAuthJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, 'jwtSecret', (err: any, decoded: any) => {
      if (err) {
        return res.status(403).json({ message: 'Failed to authenticate token' });
      }
      const { id, username, isAdmin } = decoded;
      req.userId = id;
      req.lUsername = username;
      req.isAdmin = isAdmin;

      if (!isAdmin) {
        return res.status(403).json({ message: 'You are not allowed to access this resource, Please contact the site administrator for assistance' });
      }
      next();
    });
  } else {
    res.status(401).json({ message: 'You need to login to access this resource; Please login or create an account' });
  }
};

export { userAuthJWT, adminAuthJWT };
