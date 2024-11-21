import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';
import { PERMISSIONS } from '../../constants/permissions';

const roleSchema = z.object({
  name: z.string().min(1, 'Role name is required'),
  description: z.string().min(1, 'Description is required'),
  permissions: z.array(z.string()).min(1, 'At least one permission is required')
});

type RoleFormData = z.infer<typeof roleSchema>;

interface RoleModalProps {
  onClose: () => void;
  onSubmit: (data: RoleFormData) => void;
}

const RoleModal: React.FC<RoleModalProps> = ({ onClose, onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<RoleFormData>({
    resolver: zodResolver(roleSchema)
  });

  const permissionGroups = {
    'User Management': [
      PERMISSIONS.MANAGE_USERS,
      PERMISSIONS.VIEW_USERS,
      PERMISSIONS.CREATE_USERS,
      PERMISSIONS.EDIT_USERS,
      PERMISSIONS.DELETE_USERS
    ],
    'Role Management': [
      PERMISSIONS.MANAGE_ROLES,
      PERMISSIONS.VIEW_ROLES,
      PERMISSIONS.CREATE_ROLES,
      PERMISSIONS.EDIT_ROLES,
      PERMISSIONS.DELETE_ROLES
    ],
    'Student Management': [
      PERMISSIONS.MANAGE_STUDENTS,
      PERMISSIONS.VIEW_STUDENTS,
      PERMISSIONS.CREATE_STUDENTS,
      PERMISSIONS.EDIT_STUDENTS,
      PERMISSIONS.DELETE_STUDENTS
    ],
    'Application Management': [
      PERMISSIONS.MANAGE_APPLICATIONS,
      PERMISSIONS.VIEW_APPLICATIONS,
      PERMISSIONS.CREATE_APPLICATIONS,
      PERMISSIONS.EDIT_APPLICATIONS,
      PERMISSIONS.DELETE_APPLICATIONS
    ],
    'Reports & Analytics': [
      PERMISSIONS.VIEW_REPORTS,
      PERMISSIONS.EXPORT_REPORTS,
      PERMISSIONS.VIEW_ANALYTICS
    ]
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Create New Role</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Role Name</label>
            <input
              {...register('name')}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              {...register('description')}
              rows={3}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">Permissions</label>
            <div className="space-y-6">
              {Object.entries(permissionGroups).map(([group, permissions]) => (
                <div key={group}>
                  <h3 className="text-sm font-medium text-gray-900 mb-2">{group}</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {permissions.map((permission) => (
                      <label key={permission} className="flex items-center">
                        <input
                          type="checkbox"
                          {...register('permissions')}
                          value={permission}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          {permission.split('_').join(' ').toLowerCase()}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            {errors.permissions && (
              <p className="mt-2 text-sm text-red-600">{errors.permissions.message}</p>
            )}
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
              Create Role
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RoleModal;