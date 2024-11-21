import React, { useState } from 'react';
import { 
  MessageSquare, 
  Mail, 
  Bell, 
  Settings,
  Plus,
  Filter
} from 'lucide-react';
import MessageCenter from '../components/communications/MessageCenter';
import EmailTemplates from '../components/communications/EmailTemplates';
import NotificationSettings from '../components/communications/NotificationSettings';
import BulkCommunication from '../components/communications/BulkCommunication';
import CommunicationStats from '../components/communications/CommunicationStats';

const Communications = () => {
  const [activeTab, setActiveTab] = useState<'messages' | 'templates' | 'notifications' | 'bulk'>('messages');
  const [showFilters, setShowFilters] = useState(false);

  const tabs = [
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'templates', label: 'Email Templates', icon: Mail },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'bulk', label: 'Bulk Communication', icon: Settings }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Communication Center</h1>
          <p className="mt-2 text-gray-600">Manage all communications and notifications</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-2 border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50"
          >
            <Filter className="w-5 h-5" />
            Filters
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700">
            <Plus className="w-5 h-5" />
            New Message
          </button>
        </div>
      </div>

      <CommunicationStats />

      <div className="bg-white rounded-xl shadow-sm">
        <div className="border-b px-4">
          <div className="flex space-x-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
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
          {activeTab === 'messages' && <MessageCenter />}
          {activeTab === 'templates' && <EmailTemplates />}
          {activeTab === 'notifications' && <NotificationSettings />}
          {activeTab === 'bulk' && <BulkCommunication />}
        </div>
      </div>
    </div>
  );
};

export default Communications;