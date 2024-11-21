import React from 'react';
import { Bell, MessageSquare, FileText, Calendar } from 'lucide-react';

interface Notification {
  id: string;
  type: 'message' | 'application' | 'deadline' | 'system';
  title: string;
  description: string;
  time: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'application',
    title: 'Application Update',
    description: 'John Smith's application was approved by Stanford University',
    time: '2 hours ago',
    read: false
  },
  {
    id: '2',
    type: 'deadline',
    title: 'Upcoming Deadline',
    description: 'MIT application deadline in 3 days',
    time: '5 hours ago',
    read: false
  },
  {
    id: '3',
    type: 'message',
    title: 'New Message',
    description: 'Emma Wilson sent you a message',
    time: '1 day ago',
    read: true
  }
];

const NotificationCenter = () => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'message':
        return <MessageSquare className="w-5 h-5 text-blue-600" />;
      case 'application':
        return <FileText className="w-5 h-5 text-green-600" />;
      case 'deadline':
        return <Calendar className="w-5 h-5 text-yellow-600" />;
      default:
        return <Bell className="w-5 h-5 text-purple-600" />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Notifications</h2>
        <button className="text-sm text-blue-600 hover:text-blue-700">
          Mark all as read
        </button>
      </div>
      <div className="space-y-4">
        {mockNotifications.map((notification) => (
          <div
            key={notification.id}
            className={`flex gap-4 p-3 rounded-lg ${
              notification.read ? 'bg-white' : 'bg-blue-50'
            }`}
          >
            <div className="mt-1">{getIcon(notification.type)}</div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                <span className="text-xs text-gray-500">{notification.time}</span>
              </div>
              <p className="text-sm text-gray-600 truncate">{notification.description}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="w-full mt-4 text-center text-sm text-blue-600 hover:text-blue-700">
        View all notifications
      </button>
    </div>
  );
};

export default NotificationCenter;