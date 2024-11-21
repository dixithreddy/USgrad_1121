import { z } from 'zod';

// Agency-specific validation schemas
export const agencyStudentSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  country: z.string().min(1, 'Country is required'),
  program: z.string().min(1, 'Program is required'),
  university: z.string().min(1, 'University is required'),
  status: z.enum(['active', 'inactive', 'pending']),
  agencyId: z.string().min(1, 'Agency ID is required'),
  metadata: z.record(z.any()).optional()
});

export const agencyApplicationSchema = z.object({
  studentId: z.string().min(1, 'Student ID is required'),
  universityId: z.string().min(1, 'University ID is required'),
  programId: z.string().min(1, 'Program ID is required'),
  status: z.enum(['draft', 'submitted', 'under_review', 'accepted', 'rejected']),
  submissionDate: z.string().optional(),
  agencyId: z.string().min(1, 'Agency ID is required'),
  documents: z.array(z.string()).optional(),
  metadata: z.record(z.any()).optional()
});

export const agencyDocumentSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  type: z.string().min(1, 'Type is required'),
  studentId: z.string().min(1, 'Student ID is required'),
  status: z.enum(['pending', 'verified', 'rejected']),
  agencyId: z.string().min(1, 'Agency ID is required'),
  metadata: z.record(z.any()).optional()
});

// Validation functions
export const validateAgencyData = async <T>(
  data: T,
  schema: z.ZodSchema<T>
): Promise<{ isValid: boolean; errors?: z.ZodError }> => {
  try {
    await schema.parseAsync(data);
    return { isValid: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { isValid: false, errors: error };
    }
    throw error;
  }
};