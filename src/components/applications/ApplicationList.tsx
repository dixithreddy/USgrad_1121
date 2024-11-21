import React from 'react';
import { 
  Eye, 
  Edit2, 
  MessageSquare, 
  FileText,
  Download
} from 'lucide-react';
import { format } from 'date-fns';
import ApplicationComments from './ApplicationComments';

interface Application {
  id: string;
  student: {
    name: string;
    email: string;
  };
  university: string;
  program: string;
  status: 'draft' | 'submitted' | 'under_review' | 'accepted' | 'rejected';
  submissionDate: string;
  lastUpdate: string;
  documents: {
    required: number;
    submitted: number;
  };
  comments: number;
}

const mockApplications: Application[] = [
  {
    id: '1',
    student: {
      name: 'John Smith',
      email: 'john.smith@example.com'
    },
    university: 'Stanford University',
    program: 'MS Computer Science',
    status: 'under_review',
    submissionDate: '2024-03-15',
    lastUpdate: '2024-03-16',
    documents: {
      required: 8,
      submitted: 6
    },
    comments: 3
  },
  {
    id: '2',
    student: {
      name: 'Emma Wilson',
      email: 'emma.w@example.com'
    },
    university: 'MIT',
    program: 'MS Data Science',
    status: 'submitted',
    submissionDate: '2024-03-14',
    lastUpdate: '2024-03-15',
    documents: {
      required: 7,
      submitted: 7
    },
    comments: 2
  }
];

const ApplicationList = () => {
  const [selectedApplication, setSelectedApplication] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    const colors = {
      draft: 'bg-gray-100 text-gray-800',
      submitted: 'bg-blue-100 text-blue-800',
      under_review: 'bg-yellow-100 text-yellow-800',
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
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Documents</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Update</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {mockApplications.map((application) => (
            <React.Fragment key={application.id}>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div>
                    <div className="font-medium text-gray-900">{application.student.name}</div>
                    <div className="text-sm text-gray-500">{application.student.email}</div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{application.university}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{application.program}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(application.status)}`}>
                    {application.status.split('_').join(' ').charAt(0).toUpperCase() + 
                     application.status.split('_').join(' ').slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="w-16 bg-gray-200 rounded-full h-2.5 mr-2">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{ width: `${(application.documents.submitted / application.documents.required) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-500">
                      {application.documents.submitted}/{application.documents.required}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {format(new Date(application.lastUpdate), 'MMM d, yyyy')}
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-3">
                    <button className="text-blue-600 hover:text-blue-800">
                      <Eye className="w-5 h-5" />
                    </button>
                    <button className="text-gray-600 hover:text-gray-800">
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => setSelectedApplication(
                        selectedApplication === application.id ? null : application.id
                      )}
                      className="text-gray-600 hover:text-gray-800"
                    >
                      <MessageSquare className="w-5 h-5" />
                    </button>
                    <button className="text-gray-600 hover:text-gray-800">
                      <FileText className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
              {selectedApplication === application.id && (
                <tr>
                  <td colSpan={7} className="px-6 py-4 bg-gray-50">
                    <ApplicationComments applicationId={application.id} />
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApplicationList;