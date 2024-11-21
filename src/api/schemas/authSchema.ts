import { z } from 'zod';

export const authSchema = {
  login: z.object({
    body: z.object({
      email: z.string().email('Invalid email address'),
      password: z.string().min(8, 'Password must be at least 8 characters'),
      mfaCode: z.string().optional()
    })
  }),

  forgotPassword: z.object({
    body: z.object({
      email: z.string().email('Invalid email address')
    })
  }),

  resetPassword: z.object({
    body: z.object({
      token: z.string(),
      password: z.string().min(8, 'Password must be at least 8 characters'),
      confirmPassword: z.string()
    }).refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ['confirmPassword']
    })
  }),

  changePassword: z.object({
    body: z.object({
      currentPassword: z.string(),
      newPassword: z.string().min(8, 'Password must be at least 8 characters'),
      confirmPassword: z.string()
    }).refine((data) => data.newPassword === data.confirmPassword, {
      message: "Passwords don't match",
      path: ['confirmPassword']
    })
  })
};