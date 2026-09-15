// components/CardSkeleton.tsx
import React from 'react';

export const CardSkeleton: React.FC = () => {
  return (
    <div className="p-4 border rounded-lg shadow-sm w-full max-w-sm space-y-3 animate-pulse">
      {/* Skeleton Immagine */}
      <div className="w-full h-48 bg-gray-300 rounded-md"></div>
      
      {/* Skeleton Titolo */}
      <div className="h-6 bg-gray-300 rounded w-3/4"></div>
      
      {/* Skeleton Testi */}
      <div className="space-y-2">
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
      </div>
    </div>
  );
};