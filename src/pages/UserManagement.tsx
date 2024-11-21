import React, { useState } from 'react';
import { 
  Users, 
  Shield, 
  Activity,
  Plus,
  Filter
} from 'lucide-react';
import UserList from '../components/users/UserList';
import RoleList from '../components/users/RoleList';
import UserModal from '../components/users/UserModal';
import RoleModal from '../components/users/RoleModal';
import UserStats from '../components/users/UserStats';

const UserManagement = () => {
  const [activeTab, setActiveTab] = useState<'users' | 'roles'>('users');
  const [showUserModal, setShowUserModal] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const tabs = [
    { id: 'users', label: 'Users', icon: Users },
    { id: 'roles', label: 'Roles & Permissions', icon: Shield }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="mt-2 text-gray-600">Manage users, roles, and permissions</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-2 border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50"
          >
            <Filter className="w-5 h-5" />
            Filters
          </button>
          <button
            onClick={() => activeTab === 'users' ? setShowUserModal(true) : setShowRoleModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
          >
            <Plus className="w-5 h-5" />
            {activeTab === 'users' ? 'New User' : 'New Role'}
          </button>
        </div>
      </div>

      <UserStats />

      <div className="bg-white rounded-xl shadow-sm">
        <div className="border-b px-4">
          <div className="flex space-x-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'users' | 'roles')}
                className={`py-4 px-4 flex items-center gap-2 border-b-2 font-medium ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'users' ? <UserList /> : <RoleList />}
        </div>
      </div>

      {showUserModal && (
        <UserModal
          onClose={() => setShowUserModal(false)}
          onSubmit={(data) => {
            console.log('Create user:', data);
            setShowUserModal(false);
          }}
        />
      )}

      {showRoleModal && (
        <RoleModal
          onClose={() => setShowRoleModal(false)}
          onSubmit={(data) => {
            console.log('Create role:', data);
            setShowRoleModal(false);
          }}
        />
      )}
    </div>
  );
};

export default UserManagement;