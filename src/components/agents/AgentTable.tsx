import React from 'react';
import { Edit2, Trash2, ChevronRight } from 'lucide-react';
import { Agent } from '../../types';

interface AgentTableProps {
  agents: Agent[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const AgentTable: React.FC<AgentTableProps> = ({
  agents,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Agent</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Region</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Commission Rate</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conversion Rate</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Active Students</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {agents.map((agent) => (
            <tr key={agent.id} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <div>
                  <div className="font-medium text-gray-900">{agent.name}</div>
                  <div className="text-sm text-gray-500">{agent.email}</div>
                </div>
              </td>
              <td className="px-6 py-4 text-gray-500">
                {agent.region}
              </td>
              <td className="px-6 py-4">
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  {agent.commissionRate}%
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div className="w-16 bg-gray-200 rounded-full h-2.5 mr-2">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{ width: `${agent.performance.conversionRate}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-500">
                    {agent.performance.conversionRate}%
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 text-gray-500">
                {agent.performance.activeStudents}
              </td>
              <td className="px-6 py-4">
                <div className="flex gap-3">
                  <button
                    onClick={() => onEdit(agent.id)}
                    className="text-blue-600 hover:text-blue-800"
                    title="Edit"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => onDelete(agent.id)}
                    className="text-red-600 hover:text-red-800"
                    title="Delete"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                  <button
                    className="text-gray-600 hover:text-gray-800"
                    title="View Details"
                  >
                    <ChevronRight className="w-5 h-5" />
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

export default AgentTable;