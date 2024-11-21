import React from 'react';
import { Edit2, Trash2, Users, Shield } from 'lucide-react';

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  usersCount: number;
  createdAt: string;
}

const mockRoles: Role[] = [
  {
    id: '1',
    name: 'Admin',
    description: 'Full system access with all permissions',
    permissions: ['manage_users', 'manage_roles', 'view_reports', 'manage_settings'],
    usersCount: 5,
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'Agent',
    description: 'Access to student management and applications',
    permissions: ['view_students', 'manage_applications', 'view_reports'],
    usersCount: 12,
    createdAt: '2024-01-20'
  }
];

const RoleList = () => {
  return (
    <div className="space-y-6">
      {mockRoles.map((role) => (
        <div
          key={role.id}
          className="bg-white border rounded-lg p-6 hover:shadow-sm transition-shadow"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-blue-50">
                <Shield className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">{role.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{role.description}</p>
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Permissions:</h4>
                  <div className="flex flex-wrap gap-2">
                    {role.permissions.map((permission) => (
                      <span
                        key={permission}
                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                      >
                        {permission.split('_').join(' ')}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end gap-4">
              <div className="flex items-center gap-3">
                <button className="text-blue-600 hover:text-blue-800">
                  <Edit2 className="w-5 h-5" />
                </button>
                <button className="text-red-600 hover:text-red-800">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Users className="w-4 h-4 mr-1" />
                {role.usersCount} users
              </div>
              <div className="text-xs text-gray-400">
                Created {new Date(role.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RoleList;