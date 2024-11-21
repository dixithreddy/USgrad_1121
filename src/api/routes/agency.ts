import express from 'express';
import { validateRequest } from '../middleware/validation';
import { agencyController } from '../controllers/agencyController';
import { agencySchema } from '../schemas/agencySchema';
import { requireAuth, requireRole } from '../middleware/auth';
import { ROLES } from '../constants/roles';

const router = express.Router();

// Agency management routes
router.post(
  '/',
  requireAuth,
  requireRole([ROLES.ADMIN]),
  validateRequest(agencySchema.createAgency),
  agencyController.createAgency
);

router.get(
  '/',
  requireAuth,
  requireRole([ROLES.ADMIN, ROLES.AGENCY_ADMIN]),
  agencyController.getAgencies
);

router.get(
  '/:agencyId',
  requireAuth,
  requireRole([ROLES.ADMIN, ROLES.AGENCY_ADMIN]),
  agencyController.getAgencyById
);

router.put(
  '/:agencyId',
  requireAuth,
  requireRole([ROLES.ADMIN, ROLES.AGENCY_ADMIN]),
  validateRequest(agencySchema.updateAgency),
  agencyController.updateAgency
);

// Agency staff management
router.post(
  '/:agencyId/staff',
  requireAuth,
  requireRole([ROLES.ADMIN, ROLES.AGENCY_ADMIN]),
  validateRequest(agencySchema.addStaffMember),
  agencyController.addStaffMember
);

router.get(
  '/:agencyId/staff',
  requireAuth,
  requireRole([ROLES.ADMIN, ROLES.AGENCY_ADMIN]),
  agencyController.getStaffMembers
);

router.delete(
  '/:agencyId/staff/:staffId',
  requireAuth,
  requireRole([ROLES.ADMIN, ROLES.AGENCY_ADMIN]),
  agencyController.removeStaffMember
);

// Agency performance metrics
router.get(
  '/:agencyId/metrics',
  requireAuth,
  requireRole([ROLES.ADMIN, ROLES.AGENCY_ADMIN]),
  agencyController.getAgencyMetrics
);

// Agency commission management
router.get(
  '/:agencyId/commissions',
  requireAuth,
  requireRole([ROLES.ADMIN, ROLES.AGENCY_ADMIN]),
  agencyController.getCommissions
);

router.post(
  '/:agencyId/commissions/calculate',
  requireAuth,
  requireRole([ROLES.ADMIN]),
  agencyController.calculateCommission
);

export default router;