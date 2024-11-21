import React from 'react';
import { format } from 'date-fns';
import { FileText, Mail, Calendar, CheckCircle, AlertCircle } from 'lucide-react';

interface TimelineEvent {
  id: string;
  type: 'document' | 'communication' | 'application' | 'status';
  title: string;
  description: string;
  timestamp: string;
  status?: 'success' | 'warning' | 'error';
}

const mockEvents: TimelineEvent[] = [
  {
    id: '1',
    type: 'document',
    title: 'Transcript Uploaded',
    description: 'Official transcript from previous university uploaded',
    timestamp: '2024-03-15T10:30:00',
    status: 'success'
  },
  {
    id: '2',
    type: 'communication',
    title: 'Email Sent',
    description: 'Application status update email sent to student',
    timestamp: '2024-03-14T15:45:00'
  },
  {
    id: '3',
    type: 'application',
    title: 'Application Submitted',
    description: 'Application to Stanford University submitted',
    timestamp: '2024-03-13T09:15:00',
    status: 'success'
  }
];

const StudentTimeline = () => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'document':
        return <FileText className="w-5 h-5" />;
      case 'communication':
        return <Mail className="w-5 h-5" />;
      case 'application':
        return <Calendar className="w-5 h-5" />;
      default:
        return <CheckCircle className="w-5 h-5" />;
    }
  };

  const getStatusIcon = (status?: string) => {
    if (!status) return null;
    return status === 'success' ? (
      <CheckCircle className="w-4 h-4 text-green-500" />
    ) : (
      <AlertCircle className="w-4 h-4 text-yellow-500" />
    );
  };

  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {mockEvents.map((event, eventIdx) => (
          <li key={event.id}>
            <div className="relative pb-8">
              {eventIdx !== mockEvents.length - 1 ? (
                <span
                  className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                  aria-hidden="true"
                />
              ) : null}
              <div className="relative flex space-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                  {getIcon(event.type)}
                </div>
                <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-gray-900">
                        {event.title}
                      </p>
                      {getStatusIcon(event.status)}
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">
                      {event.description}
                    </p>
                  </div>
                  <div className="whitespace-nowrap text-right text-sm text-gray-500">
                    {format(new Date(event.timestamp), 'MMM d, h:mm a')}
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentTimeline;