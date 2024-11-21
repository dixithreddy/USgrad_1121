import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { usePermissions } from '../../hooks/usePermissions';
import { ROLES } from '../../constants/roles';
import AgencySidebar from '../navigation/AgencySidebar';

const AgencyLayout = () => {
  const { hasPermission } = usePermissions();

  if (!hasPermission(ROLES.AGENT_ADMIN)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AgencySidebar />
      <main className="flex-1 ml-64 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AgencyLayout;