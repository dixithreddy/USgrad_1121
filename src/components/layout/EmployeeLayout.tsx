import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { usePermissions } from '../../hooks/usePermissions';
import { ROLES } from '../../constants/roles';
import Sidebar from '../Sidebar';
import RestrictedBanner from '../common/RestrictedBanner';

const EmployeeLayout = () => {
  const { hasPermission } = usePermissions();

  if (!hasPermission(ROLES.EMPLOYEE)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 ml-64">
        <RestrictedBanner role="Employee" />
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default EmployeeLayout;