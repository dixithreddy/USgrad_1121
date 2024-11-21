import React from 'react';
import { Cloud, CheckCircle, AlertCircle } from 'lucide-react';

interface BackupStatus {
  lastBackup: string;
  status: 'success' | 'failed';
  size: string;
  location: string;
}

interface BackupStatusProps {
  backup: BackupStatus;
}

const BackupStatus: React.FC<BackupStatusProps> = ({ backup }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">Backup Status</h3>
        <Cloud className="w-6 h-6 text-blue-600" />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Last Backup</span>
          <span className="text-gray-900">{backup.lastBackup}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-600">Status</span>
          <div className="flex items-center">
            {backup.status === 'success' ? (
              <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
            )}
            <span className={backup.status === 'success' ? 'text-green-600' : 'text-red-600'}>
              {backup.status.charAt(0).toUpperCase() + backup.status.slice(1)}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-600">Size</span>
          <span className="text-gray-900">{backup.size}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-600">Location</span>
          <span className="text-gray-900">{backup.location}</span>
        </div>
      </div>
    </div>
  );
};

export default BackupStatus;