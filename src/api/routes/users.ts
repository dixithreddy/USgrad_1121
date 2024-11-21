import express from 'express';
import { validateRequest } from '../middleware/validation';
import { userController } from '../controllers/userController';
import { userSchema } from '../schemas/userSchema';
import { requireAuth, requireRole } from '../middleware/auth';
import { ROLES } from '../constants/roles';

const router = express.Router();

// User management routes (Admin only)
router.post(
  '/',
  requireAuth,
  requireRole([ROLES.ADMIN]),
  validateRequest(userSchema.createUser),
  userController.createUser
);

router.get(
  '/',
  requireAuth,
  requireRole([ROLES.ADMIN]),
  userController.getUsers
);

router.get(
  '/:userId',
  requireAuth,
  requireRole([ROLES.ADMIN]),
  userController.getUserById
);

router.put(
  '/:userId',
  requireAuth,
  requireRole([ROLES.ADMIN]),
  validateRequest(userSchema.updateUser),
  userController.updateUser
);

router.delete(
  '/:userId',
  requireAuth,
  requireRole([ROLES.ADMIN]),
  userController.deleteUser
);

// Role management
router.post(
  '/:userId/roles',
  requireAuth,
  requireRole([ROLES.ADMIN]),
  validateRequest(userSchema.assignRole),
  userController.assignRole
);

router.delete(
  '/:userId/roles/:roleId',
  requireAuth,
  requireRole([ROLES.ADMIN]),
  userController.removeRole
);

export default router;