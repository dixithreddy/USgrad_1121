import React from 'react';
import { Edit2, Trash2, Shield, Activity } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  status: 'active' | 'inactive';
  workload: number;
  assignedTasks: number;
  performance: {
    completionRate: number;
    avgResponseTime: string;
  };
}

const mockTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@usgrad.com',
    role: 'Senior Counselor',
    department: 'Admissions',
    status: 'active',
    workload: 75,
    assignedTasks: 12,
    performance: {
      completionRate: 92,
      avgResponseTime: '2.5 hours'
    }
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.j@usgrad.com',
    role: 'Document Specialist',
    department: 'Documentation',
    status: 'active',
    workload: 60,
    assignedTasks: 8,
    performance: {
      completionRate: 88,
      avgResponseTime: '3 hours'
    }
  }
];

const TeamList = () => {
  const getWorkloadColor = (workload: number) => {
    if (workload > 80) return 'text-red-600';
    if (workload > 60) return 'text-yellow-600';
    return 'text-green-600';
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
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team Member</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Workload</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {mockTeamMembers.map((member) => (
            <tr key={member.id} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <div>
                  <div className="font-medium text-gray-900">{member.name}</div>
                  <div className="text-sm text-gray-500">{member.email}</div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <Shield className="w-4 h-4 text-blue-600 mr-2" />
                  <span className="text-sm text-gray-900">{member.role}</span>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">{member.department}</td>
              <td className="px-6 py-4">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(member.status)}`}>
                  {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div className="w-16 bg-gray-200 rounded-full h-2.5 mr-2">
                    <div
                      className={`h-2.5 rounded-full ${
                        member.workload > 80 ? 'bg-red-600' :
                        member.workload > 60 ? 'bg-yellow-600' :
                        'bg-green-600'
                      }`}
                      style={{ width: `${member.workload}%` }}
                    ></div>
                  </div>
                  <span className={`text-sm ${getWorkloadColor(member.workload)}`}>
                    {member.workload}%
                  </span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {member.assignedTasks} tasks assigned
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="space-y-1">
                  <div className="flex items-center text-sm">
                    <Activity className="w-4 h-4 text-green-600 mr-1" />
                    <span>{member.performance.completionRate}% completion</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    Avg. Response: {member.performance.avgResponseTime}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex gap-3">
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

export default TeamList;