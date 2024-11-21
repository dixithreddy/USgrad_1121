import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home,
  Users,
  FileText,
  MessageSquare,
  BarChart2
} from 'lucide-react';

const AgentStaffSidebar = () => {
  const navItems = [
    { icon: Home, label: 'Dashboard', path: '/agent-staff' },
    { icon: Users, label: 'My Students', path: '/agent-staff/students' },
    { icon: FileText, label: 'Applications', path: '/agent-staff/applications' },
    { icon: MessageSquare, label: 'Communications', path: '/agent-staff/communications' },
    { icon: BarChart2, label: 'My Reports', path: '/agent-staff/reports' }
  ];

  return (
    <div className="w-64 h-screen bg-gray-900 text-white fixed left-0 top-0 overflow-y-auto">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-8">Agent Portal</h1>
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

export default AgentStaffSidebar;