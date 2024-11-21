import React from 'react';
import { 
  UserPlus, 
  FileText, 
  Mail, 
  Calendar,
  Download,
  Settings
} from 'lucide-react';

const QuickActions = () => {
  const actions = [
    {
      icon: UserPlus,
      label: 'New Student',
      onClick: () => console.log('New student')
    },
    {
      icon: FileText,
      label: 'New Application',
      onClick: () => console.log('New application')
    },
    {
      icon: Mail,
      label: 'Send Email',
      onClick: () => console.log('Send email')
    },
    {
      icon: Calendar,
      label: 'Schedule',
      onClick: () => console.log('Schedule')
    },
    {
      icon: Download,
      label: 'Reports',
      onClick: () => console.log('Reports')
    },
    {
      icon: Settings,
      label: 'Settings',
      onClick: () => console.log('Settings')
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 gap-4">
        {actions.map((action) => (
          <button
            key={action.label}
            onClick={action.onClick}
            className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <action.icon className="w-6 h-6 text-blue-600 mb-2" />
            <span className="text-sm text-gray-700">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;