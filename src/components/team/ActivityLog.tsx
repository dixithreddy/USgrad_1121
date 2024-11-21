import React from 'react';
import { format } from 'date-fns';
import { User, FileText, Settings, Shield } from 'lucide-react';

interface Activity {
  id: string;
  user: string;
  action: string;
  target: string;
  timestamp: string;
  type: 'user' | 'task' | 'system' | 'role';
}

const mockActivities: Activity[] = [
  {
    id: '1',
    user: 'John Smith',
    action: 'assigned task',
    target: 'Application Review #123',
    timestamp: '2024-03-15T10:30:00',
    type: 'task'
  },
  {
    id: '2',
    user: 'Sarah Johnson',
    action: 'updated role',
    target: 'Document Specialist',
    timestamp: '2024-03-15T09:45:00',
    type: 'role'
  },
  {
    id: '3',
    user: 'Admin',
    action: 'added team member',
    target: 'Emma Wilson',
    timestamp: '2024-03-15T09:00:00',
    type: 'user'
  }
];

const ActivityLog = () => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'user':
        return <User className="w-5 h-5 text-blue-600" />;
      case 'task':
        return <FileText className="w-5 h-5 text-green-600" />;
      case 'role':
        return <Shield className="w-5 h-5 text-yellow-600" />;
      default:
        return <Settings className="w-5 h-5 text-purple-600" />;
    }
  };

  return (
    <div className="space-y-4">
      {mockActivities.map((activity) => (
        <div
          key={activity.id}
          className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg"
        >
          <div className="mt-1">{getIcon(activity.type)}</div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start">
              <div>
                <span className="font-medium text-gray-900">{activity.user}</span>
                <span className="text-gray-600"> {activity.action} </span>
                <span className="font-medium text-gray-900">{activity.target}</span>
              </div>
              <span className="text-sm text-gray-500">
                {format(new Date(activity.timestamp), 'MMM d, h:mm a')}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActivityLog;