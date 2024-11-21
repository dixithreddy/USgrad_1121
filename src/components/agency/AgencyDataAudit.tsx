import React from 'react';
import { format } from 'date-fns';
import { Shield, AlertCircle } from 'lucide-react';

interface AuditLog {
  id: string;
  action: string;
  userId: string;
  userEmail: string;
  timestamp: string;
  details: string;
  metadata?: Record<string, any>;
}

interface AgencyDataAuditProps {
  logs: AuditLog[];
}

const AgencyDataAudit: React.FC<AgencyDataAuditProps> = ({ logs }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Data Access Audit Log</h3>
        <Shield className="w-5 h-5 text-blue-600" />
      </div>

      <div className="space-y-4">
        {logs.map((log) => (
          <div
            key={log.id}
            className="bg-white border rounded-lg p-4 hover:shadow-sm transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-blue-600" />
                  <span className="font-medium text-gray-900">{log.action}</span>
                </div>
                <p className="mt-1 text-sm text-gray-500">{log.details}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">
                  {format(new Date(log.timestamp), 'MMM d, yyyy HH:mm:ss')}
                </p>
                <p className="text-xs text-gray-400">{log.userEmail}</p>
              </div>
            </div>
            {log.metadata && (
              <div className="mt-2 pt-2 border-t">
                <p className="text-xs text-gray-500">
                  Metadata: {JSON.stringify(log.metadata)}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgencyDataAudit;