import React from 'react';
import { Shield, AlertTriangle, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';

interface SecurityEvent {
  id: string;
  timestamp: string;
  type: string;
  severity: 'low' | 'medium' | 'high';
  description: string;
  source: string;
  status: 'open' | 'resolved' | 'investigating';
}

interface SecurityEventsProps {
  events: SecurityEvent[];
}

const SecurityEvents: React.FC<SecurityEventsProps> = ({ events }) => {
  const getSeverityColor = (severity: string) => {
    const colors = {
      low: 'bg-yellow-100 text-yellow-800',
      medium: 'bg-orange-100 text-orange-800',
      high: 'bg-red-100 text-red-800'
    };
    return colors[severity as keyof typeof colors];
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'resolved':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'investigating':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      default:
        return <Shield className="w-5 h-5 text-red-500" />;
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Security Events</h2>

      <div className="space-y-4">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                {getStatusIcon(event.status)}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">{event.type}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(event.severity)}`}>
                      {event.severity.toUpperCase()}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">{event.description}</p>
                  <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
                    <span>Source: {event.source}</span>
                    <span>Status: {event.status}</span>
                  </div>
                </div>
              </div>
              <span className="text-sm text-gray-500">
                {format(new Date(event.timestamp), 'PPpp')}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SecurityEvents;