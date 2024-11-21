import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ROLES } from '../constants/roles';
import { User } from '../types';

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as User;
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

export const requireRole = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }

    next();
  };
};

export const requireAgencyAccess = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  const agencyId = req.params.agencyId || req.body.agencyId;
  if (!agencyId) {
    return res.status(400).json({ error: 'Agency ID required' });
  }

  if (
    req.user.role !== ROLES.ADMIN &&
    req.user.agencyId !== agencyId
  ) {
    return res.status(403).json({ error: 'Insufficient permissions' });
  }

  next();
};