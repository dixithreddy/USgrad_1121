import React from 'react';
import { AlertTriangle } from 'lucide-react';

const AccessDenied = () => {
  return (
    <div className="flex items-center justify-center h-[60vh]">
      <div className="text-center">
        <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900">Access Denied</h2>
        <p className="mt-2 text-gray-600">
          You don't have permission to access this feature.
        </p>
      </div>
    </div>
  );
};

export default AccessDenied;