import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, Upload, Download } from 'lucide-react';

const importSchema = z.object({
  file: z.any(),
  university: z.string().min(1, 'University is required'),
  program: z.string().min(1, 'Program is required'),
  importType: z.enum(['new', 'update']),
  options: z.object({
    skipDuplicates: z.boolean(),
    sendNotifications: z.boolean(),
    validateData: z.boolean()
  })
});

type ImportFormData = z.infer<typeof importSchema>;

interface BulkImportModalProps {
  onClose: () => void;
  onImport: (data: ImportFormData) => void;
}

const BulkImportModal: React.FC<BulkImportModalProps> = ({ onClose, onImport }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<ImportFormData>({
    resolver: zodResolver(importSchema),
    defaultValues: {
      importType: 'new',
      options: {
        skipDuplicates: true,
        sendNotifications: true,
        validateData: true
      }
    }
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Bulk Import Applications</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit(onImport)} className="p-6 space-y-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Import File
              </label>
              <button
                type="button"
                className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                <Download className="w-4 h-4" />
                Download Template
              </button>
            </div>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      type="file"
                      className="sr-only"
                      {...register('file')}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">
                  CSV or Excel files up to 10MB
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">University</label>
              <select
                {...register('university')}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select University</option>
                <option value="stanford">Stanford University</option>
                <option value="mit">MIT</option>
                <option value="harvard">Harvard University</option>
              </select>
              {errors.university && (
                <p className="mt-1 text-sm text-red-600">{errors.university.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Program</label>
              <select
                {...register('program')}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Program</option>
                <option value="cs">Computer Science</option>
                <option value="engineering">Engineering</option>
                <option value="business">Business</option>
              </select>
              {errors.program && (
                <p className="mt-1 text-sm text-red-600">{errors.program.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Import Type</label>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="radio"
                  {...register('importType')}
                  value="new"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label className="ml-2 text-sm text-gray-700">
                  Create new applications
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  {...register('importType')}
                  value="update"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label className="ml-2 text-sm text-gray-700">
                  Update existing applications
                </label>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Options</label>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  {...register('options.skipDuplicates')}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-2 text-sm text-gray-700">
                  Skip duplicate entries
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  {...register('options.sendNotifications')}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-2 text-sm text-gray-700">
                  Send notifications to students
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  {...register('options.validateData')}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-2 text-sm text-gray-700">
                  Validate data before import
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Import Applications
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BulkImportModal;