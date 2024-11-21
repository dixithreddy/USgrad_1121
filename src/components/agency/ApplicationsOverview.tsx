import React from 'react';
import { ChevronRight } from 'lucide-react';

interface Application {
  id: string;
  student: string;
  university: string;
  program: string;
  status: 'pending' | 'submitted' | 'accepted' | 'rejected';
  submittedDate: string;
}

const mockApplications: Application[] = [
  {
    id: '1',
    student: 'John Smith',
    university: 'Stanford University',
    program: 'MS Computer Science',
    status: 'pending',
    submittedDate: '2024-03-15'
  },
  {
    id: '2',
    student: 'Emma Wilson',
    university: 'MIT',
    program: 'MS Data Science',
    status: 'submitted',
    submittedDate: '2024-03-14'
  },
  {
    id: '3',
    student: 'Michael Chen',
    university: 'Harvard University',
    program: 'MBA',
    status: 'accepted',
    submittedDate: '2024-03-12'
  }
];

const ApplicationsOverview = () => {
  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      submitted: 'bg-blue-100 text-blue-800',
      accepted: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors];
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">University</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Program</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {mockApplications.map((application) => (
            <tr key={application.id} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <div className="text-sm font-medium text-gray-900">
                  {application.student}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-900">{application.university}</div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-900">{application.program}</div>
              </td>
              <td className="px-6 py-4">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(application.status)}`}>
                  {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-500">
                  {new Date(application.submittedDate).toLocaleDateString()}
                </div>
              </td>
              <td className="px-6 py-4">
                <button className="text-blue-600 hover:text-blue-900">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApplicationsOverview;