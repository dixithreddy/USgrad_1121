import React from 'react';
import { format } from 'date-fns';

interface AuditLog {
  id: string;
  action: string;
  userId: string;
  userEmail: string;
  timestamp: string;
  details: string;
}

interface AuditTrailProps {
  logs: AuditLog[];
}

const AuditTrail: React.FC<AuditTrailProps> = ({ logs }) => {
  return (
    <div className="space-y-4">
      {logs.map((log) => (
        <div key={log.id} className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <span className="font-medium text-gray-900">{log.action}</span>
              <p className="text-sm text-gray-500">
                By {log.userEmail} on {format(new Date(log.timestamp), 'PPpp')}
              </p>
            </div>
            <span className="text-xs text-gray-400">ID: {log.id}</span>
          </div>
          <p className="mt-2 text-sm text-gray-600">{log.details}</p>
        </div>
      ))}
    </div>
  );
};

export default AuditTrail;