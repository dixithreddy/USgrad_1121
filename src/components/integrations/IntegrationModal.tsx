import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';

const integrationSchema = z.object({
  provider: z.string().min(1, 'Provider is required'),
  credentials: z.object({
    clientId: z.string().min(1, 'Client ID is required'),
    clientSecret: z.string().min(1, 'Client Secret is required'),
    redirectUri: z.string().url('Invalid redirect URI'),
    scope: z.string().optional()
  }),
  settings: z.object({
    syncInterval: z.number().min(5, 'Minimum sync interval is 5 minutes'),
    webhookUrl: z.string().url().optional(),
    enableNotifications: z.boolean()
  })
});

type IntegrationFormData = z.infer<typeof integrationSchema>;

interface IntegrationModalProps {
  integrationId: string | null;
  onClose: () => void;
  onSubmit: (data: IntegrationFormData) => void;
}

const IntegrationModal: React.FC<IntegrationModalProps> = ({
  integrationId,
  onClose,
  onSubmit
}) => {
  const { register, handleSubmit, formState: { errors } } = useForm<IntegrationFormData>({
    resolver: zodResolver(integrationSchema),
    defaultValues: {
      settings: {
        syncInterval: 15,
        enableNotifications: true
      }
    }
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">
              {integrationId ? 'Configure Integration' : 'New Integration'}
            </h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Provider</label>
            <select
              {...register('provider')}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select a provider</option>
              <option value="google">Google (Gmail & Calendar)</option>
              <option value="dropbox">Dropbox</option>
              <option value="stripe">Stripe</option>
              <option value="whatsapp">WhatsApp Business</option>
            </select>
            {errors.provider && (
              <p className="mt-1 text-sm text-red-600">{errors.provider.message}</p>
            )}
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">API Credentials</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Client ID</label>
              <input
                {...register('credentials.clientId')}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.credentials?.clientId && (
                <p className="mt-1 text-sm text-red-600">{errors.credentials.clientId.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Client Secret</label>
              <input
                type="password"
                {...register('credentials.clientSecret')}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.credentials?.clientSecret && (
                <p className="mt-1 text-sm text-red-600">{errors.credentials.clientSecret.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Redirect URI</label>
              <input
                {...register('credentials.redirectUri')}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.credentials?.redirectUri && (
                <p className="mt-1 text-sm text-red-600">{errors.credentials.redirectUri.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Scope</label>
              <input
                {...register('credentials.scope')}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Integration Settings</h3>

            <div>
              <label className="block text-sm font-medium text-gray-700">Sync Interval (minutes)</label>
              <input
                type="number"
                {...register('settings.syncInterval', { valueAsNumber: true })}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.settings?.syncInterval && (
                <p className="mt-1 text-sm text-red-600">{errors.settings.syncInterval.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Webhook URL (Optional)</label>
              <input
                {...register('settings.webhookUrl')}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.settings?.webhookUrl && (
                <p className="mt-1 text-sm text-red-600">{errors.settings.webhookUrl.message}</p>
              )}
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                {...register('settings.enableNotifications')}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700">
                Enable notifications for sync events
              </label>
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
              {integrationId ? 'Update Integration' : 'Create Integration'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};