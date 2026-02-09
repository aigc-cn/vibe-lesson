
import React from 'react';
import { Outlet } from 'react-router-dom';

const DataUploadLayout: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-500">
      <main className="min-w-0">
        <Outlet />
      </main>
    </div>
  );
};

export default DataUploadLayout;
