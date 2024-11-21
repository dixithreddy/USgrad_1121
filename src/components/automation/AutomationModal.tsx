import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';

const automationSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  type: z.enum(['email', 'reminder', 'document', 'task']),
  trigger: z.object({
    frequency: z.enum(['daily', 'weekly', 'monthly', 'custom']),
    time: z.string().min(1, 'Time is required'),
    customCron: z.string().optional()
  }),
  action: z.object({
    template: z.string().min(1, 'Template is required'),
    recipients: z.array(z.string()).min(1, 'At least one recipient is required'),
    conditions: z.array(z.object({
      field: z.string(),
      operator: z.string(),
      value: z.string()
    })).optional()
  })
});

type AutomationFormData = z.infer<typeof automationSchema>;

interface AutomationModalProps {
  onClose: () => void;
  onSubmit: (data: AutomationFormData) => void;
}

const AutomationModal: React.FC<AutomationModalProps> = ({ onClose, onSubmit }) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<AutomationFormData>({
    resolver: zodResolver(automationSchema),
    defaultValues: {
      trigger: {
        frequency: 'daily',
        time: '09:00'
      },
      action: {
        recipients: [],
        conditions: []
      }
    }
  });

  const frequency = watch('trigger.frequency');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Create New Automation</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                {...register('name')}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter automation name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Type</label>
              <select
                {...register('type')}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="email">Email</option>
                <option value="reminder">Reminder</option>
                <option value="document">Document Check</option>
                <option value="task">Task Assignment</option>
              </select>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Trigger Settings</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Frequency</label>
                <select
                  {...register('trigger.frequency')}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="custom">Custom</option>
                </select>
              </div>

              {frequency === 'custom' ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Custom Cron Expression</label>
                  <input
                    {...register('trigger.customCron')}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="*/5 * * * *"
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Time</label>
                  <input
                    type="time"
                    {...register('trigger.time')}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              )}
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Action Settings</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Template</label>
                <select
                  {...register('action.template')}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select a template</option>
                  <option value="deadline-reminder">Deadline Reminder</option>
                  <option value="document-expiry">Document Expiry Notice</option>
                  <option value="payment-reminder">Payment Reminder</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Recipients</label>
                <select
                  multiple
                  {...register('action.recipients')}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all-students">All Students</option>
                  <option value="all-agents">All Agents</option>
                  <option value="pending-applications">Pending Applications</option>
                  <option value="upcoming-deadlines">Upcoming Deadlines</option>
                </select>
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
              Create Automation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AutomationModal;