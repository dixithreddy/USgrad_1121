import React from 'react';
import { AlertCircle } from 'lucide-react';

interface RestrictedBannerProps {
  role: string;
}

const RestrictedBanner: React.FC<RestrictedBannerProps> = ({ role }) => {
  return (
    <div className="bg-blue-50 border-b border-blue-100">
      <div className="px-8 py-3 flex items-center gap-2">
        <AlertCircle className="w-5 h-5 text-blue-600" />
        <p className="text-sm text-blue-700">
          You are logged in as <span className="font-medium">{role}</span>. Some features may be restricted.
        </p>
      </div>
    </div>
  );
};