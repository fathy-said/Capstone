import React from 'react';

const SuperVisorDashboard: React.FC = () => {
  return (
    <div className="p-6 bg-blue-100 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Supervisor Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-medium text-gray-700 mb-4">Teams Overview</h2>
            <p className="text-gray-600">Manage and monitor your teams</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-medium text-gray-700 mb-4">Project Status</h2>
            <p className="text-gray-600">Track project progress</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-medium text-gray-700 mb-4">Tasks</h2>
            <p className="text-gray-600">View and assign tasks</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperVisorDashboard;
