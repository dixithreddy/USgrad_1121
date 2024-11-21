import React from 'react';
import { X } from 'lucide-react';

interface ApplicationFiltersProps {
  onClose: () => void;
}

const ApplicationFilters: React.FC<ApplicationFiltersProps> = ({ onClose }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Filter Applications</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <select className="w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500">
            <option value="">All Statuses</option>
            <option value="draft">Draft</option>
            <option value="submitted">Submitted</option>
            <option value="under_review">Under Review</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

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
            <option value="engineering">Engineering</option>
            <option value="business">Business</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Submission Date
          </label>
          <select className="w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500">
            <option value="">All Dates</option>
            <option value="today">Today</option>
            <option value="this_week">This Week</option>
            <option value="this_month">This Month</option>
            <option value="custom">Custom Range</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Document Status
          </label>
          <select className="w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500">
            <option value="">All Documents</option>
            <option value="complete">Complete</option>
            <option value="incomplete">Incomplete</option>
            <option value="pending">Pending Review</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Agent
          </label>
          <select className="w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500">
            <option value="">All Agents</option>
            <option value="agent1">Sarah Johnson</option>
            <option value="agent2">Mike Wilson</option>
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

export default ApplicationFilters;