import React from 'react';
import { ChevronRight } from 'lucide-react';

interface Application {
  id: string;
  student: string;
  program: string;
  university: string;
  status: 'draft' | 'submitted' | 'in_review' | 'completed';
  lastUpdated: string;
}

const mockApplications: Application[] = [
  {
    id: '1',
    student: 'John Smith',
    program: 'MS Computer Science',
    university: 'Stanford University',
    status: 'in_review',
    lastUpdated: '2024-03-15'
  },
  {
    id: '2',
    student: 'Emma Wilson',
    program: 'MBA',
    university: 'Harvard University',
    status: 'draft',
    lastUpdated: '2024-03-14'
  }
];

const ApplicationsOverview = () => {
  const getStatusColor = (status: string) => {
    const colors = {
      draft: 'bg-gray-100 text-gray-800',
      submitted: 'bg-blue-100 text-blue-800',
      in_review: 'bg-yellow-100 text-yellow-800',
      completed: 'bg-green-100 text-green-800'
    };
    return colors[status as keyof typeof colors];
  };

  return (
    <div className="space-y-4">
      {mockApplications.map((application) => (
        <div
          key={application.id}
          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
        >
          <div>
            <h3 className="font-medium text-gray-900">{application.student}</h3>
            <p className="text-sm text-gray-500">{application.program}</p>
            <p className="text-sm text-gray-500">{application.university}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(application.status)}`}>
                {application.status.split('_').join(' ').charAt(0).toUpperCase() + 
                 application.status.split('_').join(' ').slice(1)}
              </span>
              <p className="text-sm text-gray-500 mt-1">
                Updated: {new Date(application.lastUpdated).toLocaleDateString()}
              </p>
            </div>
            <button className="text-gray-400 hover:text-gray-500">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ApplicationsOverview;