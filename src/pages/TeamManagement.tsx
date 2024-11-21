import React, { useState } from 'react';
import { 
  Users, 
  Shield, 
  Activity,
  Plus,
  Filter
} from 'lucide-react';
import TeamList from '../components/team/TeamList';
import TeamMemberModal from '../components/team/TeamMemberModal';
import TeamStats from '../components/team/TeamStats';
import WorkloadDistribution from '../components/team/WorkloadDistribution';
import ActivityLog from '../components/team/ActivityLog';

const TeamManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Team Management</h1>
          <p className="mt-2 text-gray-600">Manage team members, roles, and workload distribution</p>
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
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
          >
            <Plus className="w-5 h-5" />
            Add Team Member
          </button>
        </div>
      </div>

      <TeamStats />

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-6">Workload Distribution</h2>
          <WorkloadDistribution />
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-6">Recent Activity</h2>
          <ActivityLog />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6">
          <TeamList />
        </div>
      </div>

      {showModal && (
        <TeamMemberModal
          onClose={() => setShowModal(false)}
          onSubmit={(data) => {
            console.log('Add team member:', data);
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
};

export default TeamManagement;