import { NextFunction, Request, Response } from 'express';
import { verifyAgencyAccess } from '../utils/auth';

export const agencyDataMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const agencyId = req.headers['x-agency-id'];
    const token = req.headers.authorization?.split(' ')[1];

    if (!agencyId || !token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const hasAccess = await verifyAgencyAccess(token, agencyId as string);
    if (!hasAccess) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    // Add agency context to request
    req.agencyContext = {
      agencyId: agencyId as string,
      timestamp: new Date().toISOString()
    };

    next();
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};