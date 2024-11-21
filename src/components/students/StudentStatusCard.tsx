import React from 'react';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface StudentStatusCardProps {
  student: {
    status: string;
    applicationProgress: number;
    targetUniversity: string;
    targetProgram: string;
  };
}

const StudentStatusCard: React.FC<StudentStatusCardProps> = ({ student }) => {
  const getStatusColor = (status: string) => {
    return status === 'Active'
      ? 'bg-green-100 text-green-800'
      : 'bg-gray-100 text-gray-800';
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 75) return 'bg-green-600';
    if (progress >= 50) return 'bg-yellow-600';
    return 'bg-red-600';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Status Overview</h3>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(student.status)}`}>
          {student.status}
        </span>
      </div>

      <div className="space-y-6">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Application Progress</span>
            <span className="text-sm font-medium text-gray-900">{student.applicationProgress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${getProgressColor(student.applicationProgress)}`}
              style={{ width: `${student.applicationProgress}%` }}
            ></div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <span className="text-sm text-gray-500">Target University</span>
            <p className="font-medium text-gray-900">{student.targetUniversity}</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">Target Program</span>
            <p className="font-medium text-gray-900">{student.targetProgram}</p>
          </div>
        </div>

        <div className="border-t pt-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Documents Submitted</span>
            <CheckCircle className="w-5 h-5 text-green-500" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Application Review</span>
            <Clock className="w-5 h-5 text-yellow-500" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Visa Status</span>
            <AlertCircle className="w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentStatusCard;