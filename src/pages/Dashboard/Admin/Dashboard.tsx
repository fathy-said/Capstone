import React from 'react';

const AdminDashboard: React.FC = () => {
  return (
    <div className="p-6 bg-blue-100 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-medium text-gray-700 mb-4">User Management</h2>
            <p className="text-gray-600">Manage users and permissions</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-medium text-gray-700 mb-4">Projects Overview</h2>
            <p className="text-gray-600">Monitor all projects</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-medium text-gray-700 mb-4">System Settings</h2>
            <p className="text-gray-600">Configure system settings</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
