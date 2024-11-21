import { z } from 'zod';

export const studentSchema = {
  createStudent: z.object({
    body: z.object({
      name: z.string().min(1, 'Name is required'),
      email: z.string().email('Invalid email address'),
      phone: z.string().optional(),
      country: z.string().min(1, 'Country is required'),
      agencyId: z.string().uuid(),
      status: z.enum(['active', 'inactive']).default('active'),
      academicInfo: z.object({
        currentEducation: z.string(),
        gpa: z.number().optional(),
        testScores: z.record(z.any()).optional()
      }).optional()
    })
  }),

  updateStudent: z.object({
    body: z.object({
      name: z.string().min(1, 'Name is required').optional(),
      email: z.string().email('Invalid email address').optional(),
      phone: z.string().optional(),
      status: z.enum(['active', 'inactive']).optional(),
      academicInfo: z.object({
        currentEducation: z.string(),
        gpa: z.number().optional(),
        testScores: z.record(z.any()).optional()
      }).optional()
    })
  }),

  uploadDocument: z.object({
    body: z.object({
      type: z.string().min(1, 'Document type is required'),
      description: z.string().optional()
    })
  }),

  createApplication: z.object({
    body: z.object({
      universityId: z.string().uuid(),
      programId: z.string().uuid(),
      intake: z.string(),
      status: z.enum(['draft', 'submitted', 'under_review', 'accepted', 'rejected'])
        .default('draft'),
      documents: z.array(z.string().uuid()).optional()
    })
  }),

  addCommunication: z.object({
    body: z.object({
      type: z.enum(['email', 'call', 'meeting', 'note']),
      subject: z.string().min(1, 'Subject is required'),
      content: z.string().min(1, 'Content is required'),
      attachments: z.array(z.string()).optional()
    })
  })
};