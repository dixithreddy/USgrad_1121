import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';
import { Student } from '../../types';

const studentSchema = z.object({
  name: z.string().min(1, 'Student name is required'),
  email: z.string().email('Invalid email address'),
  country: z.string().min(1, 'Country is required'),
  status: z.enum(['Lead', 'Applied', 'Accepted', 'Enrolled', 'Rejected']),
  targetUniversity: z.string().min(1, 'Target university is required'),
  targetProgram: z.string().min(1, 'Target program is required'),
  applicationProgress: z.number().min(0).max(100)
});

type StudentFormData = z.infer<typeof studentSchema>;

interface StudentModalProps {
  student?: Student;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: StudentFormData) => void;
}

const StudentModal: React.FC<StudentModalProps> = ({
  student,
  isOpen,
  onClose,
  onSubmit
}) => {
  const { register, handleSubmit, formState: { errors } } = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),
    defaultValues: student || {
      name: '',
      email: '',
      country: '',
      status: 'Lead',
      targetUniversity: '',
      targetProgram: '',
      applicationProgress: 0
    }
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">
              {student ? 'Edit Student' : 'Add Student'}
            </h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                {...register('name')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                {...register('email')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Country</label>
              <input
                {...register('country')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.country && (
                <p className="mt-1 text-sm text-red-600">{errors.country.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select
                {...register('status')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="Lead">Lead</option>
                <option value="Applied">Applied</option>
                <option value="Accepted">Accepted</option>
                <option value="Enrolled">Enrolled</option>
                <option value="Rejected">Rejected</option>
              </select>
              {errors.status && (
                <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Target University</label>
              <input
                {...register('targetUniversity')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.targetUniversity && (
                <p className="mt-1 text-sm text-red-600">{errors.targetUniversity.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Target Program</label>
              <input
                {...register('targetProgram')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.targetProgram && (
                <p className="mt-1 text-sm text-red-600">{errors.targetProgram.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Application Progress (%)</label>
              <input
                type="number"
                {...register('applicationProgress', { valueAsNumber: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.applicationProgress && (
                <p className="mt-1 text-sm text-red-600">{errors.applicationProgress.message}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {student ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentModal;