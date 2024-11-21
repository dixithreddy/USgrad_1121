import React from 'react';
import { useAuth } from '../../hooks/useAuth';

interface PermissionGateProps {
  children: React.ReactNode;
  permissions?: string[];
  requireAll?: boolean;
  fallback?: React.ReactNode;
}

const PermissionGate: React.FC<PermissionGateProps> = ({
  children,
  permissions = [],
  requireAll = true,
  fallback = null
}) => {
  const { hasAllPermissions, hasAnyPermission, getUserRole } = useAuth();
  const userRole = getUserRole();

  if (userRole === 'ADMIN') return <>{children}</>;
  
  if (permissions.length === 0) return <>{children}</>;

  const hasAccess = requireAll
    ? hasAllPermissions(permissions)
    : hasAnyPermission(permissions);

  return hasAccess ? <>{children}</> : <>{fallback}</>;
};

export default PermissionGate;