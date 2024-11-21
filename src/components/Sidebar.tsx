import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from './auth/AuthProvider';
import { 
  LayoutDashboard,
  GraduationCap, 
  Users, 
  UserCheck, 
  PieChart, 
  FileText, 
  MessageSquare,
  DollarSign,
  Settings,
  LogOut
} from 'lucide-react';

const Sidebar = () => {
  const { user, logout } = useAuth();

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: GraduationCap, label: 'Universities', path: '/universities' },
    { icon: Users, label: 'Students', path: '/students' },
    { icon: UserCheck, label: 'Agents', path: '/agents' },
    { icon: PieChart, label: 'Analytics', path: '/analytics' },
    { icon: FileText, label: 'Documents', path: '/documents' },
    { icon: MessageSquare, label: 'Communications', path: '/communications' },
    { icon: DollarSign, label: 'Finance', path: '/finance' },
    { icon: Settings, label: 'Settings', path: '/settings' }
  ];

  return (
    <div className="w-64 h-screen bg-gray-900 text-white fixed left-0 top-0 overflow-y-auto">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-8">US GRAD Portal</h1>
        
        {user && (
          <div className="mb-8 pb-4 border-b border-gray-700">
            <div className="flex items-center gap-3">
              {user.user_metadata?.avatar_url ? (
                <img 
                  src={user.user_metadata.avatar_url} 
                  alt={user.email}
                  className="w-10 h-10 rounded-full"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                  <span className="text-lg font-medium">
                    {user.email?.[0]?.toUpperCase()}
                  </span>
                </div>
              )}
              <div>
                <div className="font-medium">{user.email}</div>
                <div className="text-sm text-gray-400">Administrator</div>
              </div>
            </div>
          </div>
        )}

        <nav className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </NavLink>
          ))}

          <button
            onClick={() => logout()}
            className="w-full flex items-center space-x-3 p-3 rounded-lg transition-colors text-gray-300 hover:bg-gray-800"
          >
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;