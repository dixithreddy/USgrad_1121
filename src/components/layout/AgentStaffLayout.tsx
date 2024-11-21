import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { usePermissions } from '../../hooks/usePermissions';
import { ROLES } from '../../constants/roles';
import AgentStaffSidebar from '../navigation/AgentStaffSidebar';
import RestrictedBanner from '../common/RestrictedBanner';

const AgentStaffLayout = () => {
  const { hasPermission } = usePermissions();

  if (!hasPermission(ROLES.AGENT_STAFF)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AgentStaffSidebar />
      <main className="flex-1 ml-64">
        <RestrictedBanner role="Agent Staff" />
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AgentStaffLayout;