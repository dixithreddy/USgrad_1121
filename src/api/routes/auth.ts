import express from 'express';
import { validateRequest } from '../middleware/validation';
import { authController } from '../controllers/authController';
import { authSchema } from '../schemas/authSchema';
import { requireAuth, requireRole } from '../middleware/auth';

const router = express.Router();

// Authentication routes
router.post('/login', validateRequest(authSchema.login), authController.login);
router.post('/refresh-token', authController.refreshToken);
router.post('/logout', requireAuth, authController.logout);

// MFA routes
router.post('/mfa/setup', requireAuth, authController.setupMFA);
router.post('/mfa/verify', requireAuth, authController.verifyMFA);
router.post('/mfa/disable', requireAuth, authController.disableMFA);

// Password management
router.post('/forgot-password', validateRequest(authSchema.forgotPassword), authController.forgotPassword);
router.post('/reset-password', validateRequest(authSchema.resetPassword), authController.resetPassword);
router.post('/change-password', requireAuth, validateRequest(authSchema.changePassword), authController.changePassword);

// Session management
router.get('/sessions', requireAuth, authController.getSessions);
router.delete('/sessions/:sessionId', requireAuth, authController.terminateSession);
router.delete('/sessions', requireAuth, authController.terminateAllSessions);

export default router;