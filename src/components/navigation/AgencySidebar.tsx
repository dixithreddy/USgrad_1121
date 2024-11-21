import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home,
  Users,
  FileText,
  DollarSign,
  MessageSquare,
  Settings,
  BarChart2
} from 'lucide-react';

const AgencySidebar = () => {
  const navItems = [
    { icon: Home, label: 'Dashboard', path: '/agency' },
    { icon: Users, label: 'Students', path: '/agency/students' },
    { icon: FileText, label: 'Applications', path: '/agency/applications' },
    { icon: DollarSign, label: 'Finances', path: '/agency/finances' },
    { icon: MessageSquare, label: 'Communications', path: '/agency/communications' },
    { icon: BarChart2, label: 'Reports', path: '/agency/reports' },
    { icon: Settings, label: 'Settings', path: '/agency/settings' }
  ];

  return (
    <div className="w-64 h-screen bg-gray-900 text-white fixed left-0 top-0 overflow-y-auto">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-8">Agency Portal</h1>
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
        </nav>
      </div>
    </div>
  );
};

export default AgencySidebar;