import React from 'react';
import { Clock, Mail, Bell, FileCheck, Toggle, Edit2, Trash2 } from 'lucide-react';

interface Automation {
  id: string;
  name: string;
  type: 'email' | 'reminder' | 'document' | 'task';
  trigger: string;
  status: 'active' | 'inactive';
  lastRun: string;
  nextRun: string;
}

const mockAutomations: Automation[] = [
  {
    id: '1',
    name: 'Application Deadline Reminder',
    type: 'email',
    trigger: 'Every day at 9:00 AM',
    status: 'active',
    lastRun: '2024-03-15 09:00:00',
    nextRun: '2024-03-16 09:00:00'
  },
  {
    id: '2',
    name: 'Document Expiry Check',
    type: 'document',
    trigger: 'Every Monday at 8:00 AM',
    status: 'active',
    lastRun: '2024-03-11 08:00:00',
    nextRun: '2024-03-18 08:00:00'
  },
  {
    id: '3',
    name: 'Commission Payment Reminder',
    type: 'reminder',
    trigger: 'First day of every month',
    status: 'inactive',
    lastRun: '2024-03-01 10:00:00',
    nextRun: '2024-04-01 10:00:00'
  }
];

const AutomationList = () => {
  const getTypeIcon = (type: string) => {
    const icons = {
      email: Mail,
      reminder: Bell,
      document: FileCheck,
      task: Clock
    };
    const Icon = icons[type as keyof typeof icons];
    return <Icon className="w-5 h-5" />;
  };

  const getStatusColor = (status: string) => {
    return status === 'active' 
      ? 'bg-green-100 text-green-800'
      : 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trigger</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Run</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Run</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {mockAutomations.map((automation) => (
            <tr key={automation.id} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <div className="text-sm font-medium text-gray-900">{automation.name}</div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center text-gray-500">
                  {getTypeIcon(automation.type)}
                  <span className="ml-2 capitalize">{automation.type}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-900">{automation.trigger}</div>
              </td>
              <td className="px-6 py-4">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(automation.status)}`}>
                  {automation.status.charAt(0).toUpperCase() + automation.status.slice(1)}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-500">
                  {new Date(automation.lastRun).toLocaleString()}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-500">
                  {new Date(automation.nextRun).toLocaleString()}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex gap-3">
                  <button className="text-gray-600 hover:text-gray-800">
                    <Toggle className="w-5 h-5" />
                  </button>
                  <button className="text-blue-600 hover:text-blue-800">
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AutomationList;