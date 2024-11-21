import React from 'react';
import { Calendar, Clock, ChevronRight } from 'lucide-react';
import { format, isBefore, addDays } from 'date-fns';

interface Deadline {
  id: string;
  student: string;
  university: string;
  program: string;
  deadline: string;
  type: string;
}

const mockDeadlines: Deadline[] = [
  {
    id: '1',
    student: 'John Smith',
    university: 'Stanford University',
    program: 'MS Computer Science',
    deadline: '2024-03-20',
    type: 'Application'
  },
  {
    id: '2',
    student: 'Emma Wilson',
    university: 'MIT',
    program: 'MS Data Science',
    deadline: '2024-03-25',
    type: 'Document Submission'
  },
  {
    id: '3',
    student: 'Michael Chen',
    university: 'Harvard University',
    program: 'MBA',
    deadline: '2024-03-30',
    type: 'Interview'
  }
];

const UpcomingDeadlines = () => {
  const getUrgencyColor = (deadline: string) => {
    const date = new Date(deadline);
    if (isBefore(date, new Date())) {
      return 'text-red-600';
    }
    if (isBefore(date, addDays(new Date(), 7))) {
      return 'text-yellow-600';
    }
    return 'text-green-600';
  };

  return (
    <div className="space-y-4">
      {mockDeadlines.map((deadline) => (
        <div
          key={deadline.id}
          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
        >
          <div className="flex items-start gap-4">
            <Calendar className={`w-5 h-5 mt-1 ${getUrgencyColor(deadline.deadline)}`} />
            <div>
              <h3 className="font-medium text-gray-900">{deadline.student}</h3>
              <p className="text-sm text-gray-600">{deadline.university}</p>
              <p className="text-sm text-gray-500">{deadline.type}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className={`text-sm font-medium ${getUrgencyColor(deadline.deadline)}`}>
                {format(new Date(deadline.deadline), 'MMM d, yyyy')}
              </div>
              <div className="text-xs text-gray-500 flex items-center justify-end mt-1">
                <Clock className="w-3 h-3 mr-1" />
                {format(new Date(deadline.deadline), 'h:mm a')}
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default UpcomingDeadlines;