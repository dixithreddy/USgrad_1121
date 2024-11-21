import React from 'react';
import { Users, CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  metrics: {
    applications: number;
    success_rate: number;
    response_time: string;
    active_cases: number;
  };
}

const mockData: TeamMember[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'Senior Counselor',
    metrics: {
      applications: 45,
      success_rate: 85,
      response_time: '2.5h',
      active_cases: 12
    }
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: 'Counselor',
    metrics: {
      applications: 38,
      success_rate: 82,
      response_time: '2.8h',
      active_cases: 10
    }
  },
  {
    id: '3',
    name: 'Emma Wilson',
    role: 'Document Specialist',
    metrics: {
      applications: 42,
      success_rate: 88,
      response_time: '2.2h',
      active_cases: 15
    }
  }
];

const TeamPerformance = () => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team Member</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applications</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Success Rate</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Response Time</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Active Cases</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {mockData.map((member) => (
            <tr key={member.id} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <div>
                  <div className="font-medium text-gray-900">{member.name}</div>
                  <div className="text-sm text-gray-500">{member.role}</div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm font-medium text-gray-900">
                  {member.metrics.applications}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div className="w-16 bg-gray-200 rounded-full h-2.5 mr-2">
                    <div
                      className="bg-green-600 h-2.5 rounded-full"
                      style={{ width: `${member.metrics.success_rate}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-900">
                    {member.metrics.success_rate}%
                  </span>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-900">
                  {member.metrics.response_time}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-900">
                  {member.metrics.active_cases}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeamPerformance;