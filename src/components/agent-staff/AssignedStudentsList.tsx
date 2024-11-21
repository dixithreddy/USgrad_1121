import React from 'react';
import { ChevronRight, Mail } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'pending' | 'completed';
  program: string;
  university: string;
  lastActivity: string;
}

const mockStudents: Student[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    status: 'active',
    program: 'MS Computer Science',
    university: 'Stanford University',
    lastActivity: '2024-03-15'
  },
  {
    id: '2',
    name: 'Emma Wilson',
    email: 'emma.w@example.com',
    status: 'pending',
    program: 'MBA',
    university: 'Harvard University',
    lastActivity: '2024-03-14'
  }
];

const AssignedStudentsList = () => {
  const getStatusColor = (status: string) => {
    const colors = {
      active: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      completed: 'bg-blue-100 text-blue-800'
    };
    return colors[status as keyof typeof colors];
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Program</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">University</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Activity</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {mockStudents.map((student) => (
            <tr key={student.id} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <div>
                  <div className="font-medium text-gray-900">{student.name}</div>
                  <div className="text-sm text-gray-500">{student.email}</div>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">{student.program}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{student.university}</td>
              <td className="px-6 py-4">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(student.status)}`}>
                  {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {new Date(student.lastActivity).toLocaleDateString()}
              </td>
              <td className="px-6 py-4">
                <div className="flex gap-3">
                  <button className="text-blue-600 hover:text-blue-800">
                    <Mail className="w-5 h-5" />
                  </button>
                  <button className="text-gray-600 hover:text-gray-800">
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

export default AssignedStudentsList;