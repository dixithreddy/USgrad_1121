import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface AgencyDataErrorProps {
  message: string;
  onRetry?: () => void;
}

const AgencyDataError: React.FC<AgencyDataErrorProps> = ({ message, onRetry }) => {
  return (
    <div className="bg-red-50 p-4 rounded-lg">
      <div className="flex items-start">
        <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">
            Data Access Error
          </h3>
          <p className="mt-1 text-sm text-red-700">{message}</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="mt-2 text-sm font-medium text-red-600 hover:text-red-500"
            >
              Try again
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgencyDataError;