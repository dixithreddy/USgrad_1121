import React from 'react';
import { ChevronRight } from 'lucide-react';

interface Application {
  id: string;
  university: string;
  program: string;
  submissionDate: string;
  status: 'submitted' | 'under_review' | 'accepted' | 'rejected';
  deadline: string;
  completeness: number;
}

const mockApplications: Application[] = [
  {
    id: '1',
    university: 'Stanford University',
    program: 'MS Computer Science',
    submissionDate: '2024-03-15',
    status: 'under_review',
    deadline: '2024-04-15',
    completeness: 100
  },
  {
    id: '2',
    university: 'MIT',
    program: 'MS Data Science',
    submissionDate: '2024-03-10',
    status: 'submitted',
    deadline: '2024-04-01',
    completeness: 85
  }
];

const ApplicationHistory = () => {
  const getStatusColor = (status: string) => {
    const colors = {
      submitted: 'bg-blue-100 text-blue-800',
      under_review: 'bg-yellow-100 text-yellow-800',
      accepted: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors];
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Applications</h3>
        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {mockApplications.map((app) => (
          <div
            key={app.id}
            className="bg-white border rounded-lg p-4 hover:shadow-sm transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">{app.university}</h4>
                <p className="text-sm text-gray-500">{app.program}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                {app.status.split('_').join(' ').charAt(0).toUpperCase() + 
                 app.status.split('_').join(' ').slice(1)}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-500">Submitted</p>
                <p className="text-sm font-medium text-gray-900">
                  {new Date(app.submissionDate).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Deadline</p>
                <p className="text-sm font-medium text-gray-900">
                  {new Date(app.deadline).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Completeness</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-2 bg-blue-600 rounded-full"
                      style={{ width: `${app.completeness}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {app.completeness}%
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button className="text-blue-600 hover:text-blue-800">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplicationHistory;