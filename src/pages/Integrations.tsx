import React, { useState } from 'react';
import { 
  Mail, 
  Calendar, 
  FileText, 
  CreditCard,
  MessageSquare,
  Plus,
  Settings
} from 'lucide-react';
import IntegrationsList from '../components/integrations/IntegrationsList';
import IntegrationModal from '../components/integrations/IntegrationModal';
import IntegrationStats from '../components/integrations/IntegrationStats';

const Integrations = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Integrations</h1>
          <p className="mt-2 text-gray-600">Manage your system integrations and connections</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
        >
          <Plus className="w-5 h-5" />
          New Integration
        </button>
      </div>

      <IntegrationStats />

      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6">
          <IntegrationsList 
            onConfigureIntegration={(id) => {
              setSelectedIntegration(id);
              setShowModal(true);
            }}
          />
        </div>
      </div>

      {showModal && (
        <IntegrationModal
          integrationId={selectedIntegration}
          onClose={() => {
            setShowModal(false);
            setSelectedIntegration(null);
          }}
          onSubmit={(data) => {
            console.log('Configure integration:', data);
            setShowModal(false);
            setSelectedIntegration(null);
          }}
        />
      )}
    </div>
  );
};