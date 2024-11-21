import { z } from 'zod';

export const agencySchema = {
  createAgency: z.object({
    body: z.object({
      name: z.string().min(1, 'Agency name is required'),
      country: z.string().min(1, 'Country is required'),
      commissionRate: z.number().min(0).max(100),
      status: z.enum(['active', 'inactive']).default('active'),
      contactInfo: z.object({
        email: z.string().email('Invalid email address'),
        phone: z.string(),
        address: z.string()
      })
    })
  }),

  updateAgency: z.object({
    body: z.object({
      name: z.string().min(1, 'Agency name is required').optional(),
      country: z.string().min(1, 'Country is required').optional(),
      commissionRate: z.number().min(0).max(100).optional(),
      status: z.enum(['active', 'inactive']).optional(),
      contactInfo: z.object({
        email: z.string().email('Invalid email address'),
        phone: z.string(),
        address: z.string()
      }).optional()
    })
  }),

  addStaffMember: z.object({
    body: z.object({
      userId: z.string().uuid(),
      role: z.enum(['admin', 'staff']),
      permissions: z.array(z.string()).optional()
    })
  })
};