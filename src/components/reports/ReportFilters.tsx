import React from 'react';
import { X } from 'lucide-react';

interface ReportFiltersProps {
  onClose: () => void;
}

const ReportFilters: React.FC<ReportFiltersProps> = ({ onClose }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Report Filters</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            University
          </label>
          <select className="w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500">
            <option value="">All Universities</option>
            <option value="stanford">Stanford University</option>
            <option value="mit">MIT</option>
            <option value="harvard">Harvard University</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Program
          </label>
          <select className="w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500">
            <option value="">All Programs</option>
            <option value="cs">Computer Science</option>
            <option value="business">Business Administration</option>
            <option value="engineering">Engineering</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Region
          </label>
          <select className="w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500">
            <option value="">All Regions</option>
            <option value="asia">Asia Pacific</option>
            <option value="europe">Europe</option>
            <option value="namerica">North America</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Agent
          </label>
          <select className="w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500">
            <option value="">All Agents</option>
            <option value="agent1">Sarah Johnson</option>
            <option value="agent2">Michael Chen</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <select className="w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500">
            <option value="">All Statuses</option>
            <option value="accepted">Accepted</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Application Stage
          </label>
          <select className="w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500">
            <option value="">All Stages</option>
            <option value="inquiry">Inquiry</option>
            <option value="applied">Applied</option>
            <option value="interview">Interview</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end mt-6 space-x-3">
        <button
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          onClick={onClose}
        >
          Clear Filters
        </button>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          onClick={onClose}
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default ReportFilters;