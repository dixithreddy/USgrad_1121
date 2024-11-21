import React from 'react';
import { Edit2, Trash2, ChevronRight } from 'lucide-react';
import { Student } from '../../types';

interface StudentTableProps {
  students: Student[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const StudentTable: React.FC<StudentTableProps> = ({
  students,
  onEdit,
  onDelete,
}) => {
  const getStatusColor = (status: Student['status']) => {
    const colors = {
      Lead: 'bg-gray-100 text-gray-800',
      Applied: 'bg-blue-100 text-blue-800',
      Accepted: 'bg-green-100 text-green-800',
      Enrolled: 'bg-purple-100 text-purple-800',
      Rejected: 'bg-red-100 text-red-800'
    };
    return colors[status];
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Target University</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Program</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {students.map((student) => (
            <tr key={student.id} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <div>
                  <div className="font-medium text-gray-900">{student.name}</div>
                  <div className="text-sm text-gray-500">{student.email}</div>
                </div>
              </td>
              <td className="px-6 py-4 text-gray-500">
                {student.country}
              </td>
              <td className="px-6 py-4">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(student.status)}`}>
                  {student.status}
                </span>
              </td>
              <td className="px-6 py-4 text-gray-900">
                {student.targetUniversity}
              </td>
              <td className="px-6 py-4 text-gray-500">
                {student.targetProgram}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div className="w-16 bg-gray-200 rounded-full h-2.5 mr-2">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{ width: `${student.applicationProgress}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-500">
                    {student.applicationProgress}%
                  </span>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex gap-3">
                  <button
                    onClick={() => onEdit(student.id)}
                    className="text-blue-600 hover:text-blue-800"
                    title="Edit"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => onDelete(student.id)}
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

export default StudentTable;