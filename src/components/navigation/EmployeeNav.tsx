import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Users,
  FileText,
  MessageSquare,
  BarChart2
} from 'lucide-react';

const EmployeeNav = () => {
  const navItems = [
    {
      icon: Users,
      label: 'Students',
      path: '/students'
    },
    {
      icon: FileText,
      label: 'Documents',
      path: '/documents'
    },
    {
      icon: MessageSquare,
      label: 'Communications',
      path: '/communications'
    },
    {
      icon: BarChart2,
      label: 'Basic Reports',
      path: '/reports/basic'
    }
  ];

  return (
    <nav className="space-y-1">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `flex items-center px-4 py-2 text-sm font-medium rounded-md ${
              isActive
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`
          }
        >
          <item.icon className="mr-3 h-5 w-5" />
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
};