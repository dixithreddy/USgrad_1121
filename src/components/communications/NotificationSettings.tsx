import React from 'react';
import { Bell, Mail, MessageSquare, Calendar } from 'lucide-react';

interface NotificationSetting {
  id: string;
  category: string;
  description: string;
  email: boolean;
  push: boolean;
  sms: boolean;
}

const mockSettings: NotificationSetting[] = [
  {
    id: '1',
    category: 'Application Updates',
    description: 'Notifications about application status changes',
    email: true,
    push: true,
    sms: false
  },
  {
    id: '2',
    category: 'Document Submissions',
    description: 'Alerts for new document submissions and verifications',
    email: true,
    push: false,
    sms: false
  },
  {
    id: '3',
    category: 'Messages',
    description: 'New message notifications',
    email: false,
    push: true,
    sms: true
  },
  {
    id: '4',
    category: 'Deadlines',
    description: 'Reminders about upcoming deadlines',
    email: true,
    push: true,
    sms: true
  }
];

const NotificationSettings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Notification Preferences</h3>
        <p className="text-sm text-gray-500 mt-1">
          Manage how and when you want to receive notifications
        </p>
      </div>

      <div className="space-y-4">
        {mockSettings.map((setting) => (
          <div
            key={setting.id}
            className="bg-white border rounded-lg p-6 hover:shadow-sm transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-medium text-gray-900">{setting.category}</h4>
                <p className="text-sm text-gray-500 mt-1">{setting.description}</p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-4">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  defaultChecked={setting.email}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-700">Email</span>
                </div>
              </label>

              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  defaultChecked={setting.push}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-700">Push</span>
                </div>
              </label>

              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  defaultChecked={setting.sms}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-700">SMS</span>
                </div>
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationSettings;