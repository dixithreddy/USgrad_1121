import React from 'react';
import { format } from 'date-fns';
import { Activity, AlertCircle, User, Shield } from 'lucide-react';

interface AuditEvent {
  id: string;
  timestamp: string;
  userId: string;
  action: string;
  details: any;
  severity: 'info' | 'warning' | 'error';
}

interface AuditLogProps {
  events: AuditEvent[];
  onFilterChange?: (filters: any) => void;
}

const AuditLog: React.FC<AuditLogProps> = ({ events, onFilterChange }) => {
  const getEventIcon = (severity: string) => {
    switch (severity) {
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <Shield className="w-5 h-5 text-yellow-500" />;
      default:
        return <Activity className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Audit Log</h2>
        <div className="flex gap-2">
          <select
            className="rounded-lg border-gray-300 text-sm"
            onChange={(e) => onFilterChange?.({ severity: e.target.value })}
          >
            <option value="">All Severities</option>
            <option value="info">Info</option>
            <option value="warning">Warning</option>
            <option value="error">Error</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        {events.map((event) => (
          <div
            key={event.id}
            className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4">
              {getEventIcon(event.severity)}
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-medium text-gray-900">{event.action}</span>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <User className="w-4 h-4" />
                      <span>{event.userId}</span>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">
                    {format(new Date(event.timestamp), 'PPpp')}
                  </span>
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  <pre className="whitespace-pre-wrap">
                    {JSON.stringify(event.details, null, 2)}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuditLog;