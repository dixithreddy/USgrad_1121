import React, { useState } from 'react';
import { 
  Clock, 
  Mail, 
  Bell, 
  FileCheck,
  Plus,
  Settings
} from 'lucide-react';
import AutomationList from '../components/automation/AutomationList';
import AutomationModal from '../components/automation/AutomationModal';
import AutomationStats from '../components/automation/AutomationStats';

const Automation = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Automation</h1>
          <p className="mt-2 text-gray-600">Manage automated tasks and workflows</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
        >
          <Plus className="w-5 h-5" />
          New Automation
        </button>
      </div>

      <AutomationStats />

      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6">
          <AutomationList />
        </div>
      </div>

      {showModal && (
        <AutomationModal
          onClose={() => setShowModal(false)}
          onSubmit={(data) => {
            console.log('Create automation:', data);
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
};

export default Automation;