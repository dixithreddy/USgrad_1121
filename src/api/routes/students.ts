import express from 'express';
import { validateRequest } from '../middleware/validation';
import { studentController } from '../controllers/studentController';
import { studentSchema } from '../schemas/studentSchema';
import { requireAuth, requireRole } from '../middleware/auth';
import { ROLES } from '../constants/roles';

const router = express.Router();

// Student management routes
router.post(
  '/',
  requireAuth,
  requireRole([ROLES.ADMIN, ROLES.AGENCY_ADMIN, ROLES.AGENCY_STAFF]),
  validateRequest(studentSchema.createStudent),
  studentController.createStudent
);

router.get(
  '/',
  requireAuth,
  studentController.getStudents
);

router.get(
  '/:studentId',
  requireAuth,
  studentController.getStudentById
);

router.put(
  '/:studentId',
  requireAuth,
  validateRequest(studentSchema.updateStudent),
  studentController.updateStudent
);

// Document management
router.post(
  '/:studentId/documents',
  requireAuth,
  validateRequest(studentSchema.uploadDocument),
  studentController.uploadDocument
);

router.get(
  '/:studentId/documents',
  requireAuth,
  studentController.getDocuments
);

// Application management
router.post(
  '/:studentId/applications',
  requireAuth,
  validateRequest(studentSchema.createApplication),
  studentController.createApplication
);

router.get(
  '/:studentId/applications',
  requireAuth,
  studentController.getApplications
);

// Communication history
router.get(
  '/:studentId/communications',
  requireAuth,
  studentController.getCommunications
);

router.post(
  '/:studentId/communications',
  requireAuth,
  validateRequest(studentSchema.addCommunication),
  studentController.addCommunication
);

export default router;