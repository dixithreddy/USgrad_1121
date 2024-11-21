import { z } from 'zod';
import { ROLES } from '../constants/roles';

export const userSchema = {
  createUser: z.object({
    body: z.object({
      email: z.string().email('Invalid email address'),
      name: z.string().min(1, 'Name is required'),
      role: z.enum(Object.values(ROLES) as [string, ...string[]]),
      agencyId: z.string().uuid().optional(),
      status: z.enum(['active', 'inactive']).default('active')
    })
  }),

  updateUser: z.object({
    body: z.object({
      name: z.string().min(1, 'Name is required').optional(),
      role: z.enum(Object.values(ROLES) as [string, ...string[]]).optional(),
      status: z.enum(['active', 'inactive']).optional()
    })
  }),

  assignRole: z.object({
    body: z.object({
      roleId: z.string().uuid(),
      expiresAt: z.string().datetime().optional()
    })
  })
};