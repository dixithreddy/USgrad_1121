import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-50">
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-4 border-blue-200 animate-spin">
          <div className="absolute top-0 left-0 w-12 h-12 rounded-full border-t-4 border-blue-600"></div>
        </div>
        <div className="mt-4 text-center text-gray-600 font-medium">Loading...</div>
      </div>
    </div>
  );
};

export default LoadingSpinner;