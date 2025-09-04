import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="flex flex-col items-center space-y-4">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500"></div>
        <div className="text-lg font-medium text-gray-700">Loading...</div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
