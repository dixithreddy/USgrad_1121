import React from 'react';
import { format } from 'date-fns';
import { User, Settings, Shield, Database } from 'lucide-react';

interface AuditLog {
  id: string;
  action: string;
  userId: string;
  userEmail: string;
  timestamp: string;
  details: string;
  type: 'user' | 'system' | 'security' | 'data';
}

const mockLogs: AuditLog[] = [
  {
    id: '1',
    action: 'User Created',
    userId: 'admin',
    userEmail: 'admin@example.com',
    timestamp: '2024-03-15T10:30:00',
    details: 'Created new user account for john.doe@example.com',
    type: 'user'
  },
  {
    id: '2',
    action: 'System Backup',
    userId: 'system',
    userEmail: 'system',
    timestamp: '2024-03-15T10:00:00',
    details: 'Automated system backup completed successfully',
    type: 'system'
  },
  {
    id: '3',
    action: 'Role Modified',
    userId: 'admin',
    userEmail: 'director@us-grad.com',
    timestamp: '2024-03-15T09:45:00',
    details: 'Updated permissions for Agent role',
    type: 'security'
  }
];

const AuditLogs = () => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'user':
        return <User className="w-5 h-5 text-blue-600" />;
      case 'system':
        return <Settings className="w-5 h-5 text-green-600" />;
      case 'security':
        return <Shield className="w-5 h-5 text-yellow-600" />;
      case 'data':
        return <Database className="w-5 h-5 text-purple-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {mockLogs.map((log) => (
        <div
          key={log.id}
          className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg"
        >
          <div className="mt-1">{getIcon(log.type)}</div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-900">{log.action}</h3>
                <p className="text-sm text-gray-600">{log.details}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">
                  {format(new Date(log.timestamp), 'MMM d, yyyy HH:mm')}
                </p>
                <p className="text-xs text-gray-400">{log.userEmail}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AuditLogs;