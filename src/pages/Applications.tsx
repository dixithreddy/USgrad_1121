import React, { useState } from 'react';
import { 
  Plus, 
  Upload, 
  Filter,
  Download
} from 'lucide-react';
import ApplicationList from '../components/applications/ApplicationList';
import ApplicationModal from '../components/applications/ApplicationModal';
import ApplicationStats from '../components/applications/ApplicationStats';
import BulkImportModal from '../components/applications/BulkImportModal';
import ApplicationFilters from '../components/applications/ApplicationFilters';

const Applications = () => {
  const [showNewModal, setShowNewModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Applications</h1>
          <p className="mt-2 text-gray-600">Manage and track student applications</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-2 border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50"
          >
            <Filter className="w-5 h-5" />
            Filters
          </button>
          <button
            onClick={() => setShowImportModal(true)}
            className="px-4 py-2 border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50"
          >
            <Upload className="w-5 h-5" />
            Bulk Import
          </button>
          <button
            onClick={() => setShowNewModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
          >
            <Plus className="w-5 h-5" />
            New Application
          </button>
        </div>
      </div>

      <ApplicationStats />

      {showFilters && (
        <ApplicationFilters onClose={() => setShowFilters(false)} />
      )}

      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6">
          <ApplicationList />
        </div>
      </div>

      {showNewModal && (
        <ApplicationModal
          onClose={() => setShowNewModal(false)}
          onSubmit={(data) => {
            console.log('Create application:', data);
            setShowNewModal(false);
          }}
        />
      )}

      {showImportModal && (
        <BulkImportModal
          onClose={() => setShowImportModal(false)}
          onImport={(data) => {
            console.log('Import applications:', data);
            setShowImportModal(false);
          }}
        />
      )}
    </div>
  );
};

export default Applications;