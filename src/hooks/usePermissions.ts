import { useAuth0 } from '@auth0/auth0-react';

export const PERMISSIONS = {
  // User Management
  MANAGE_USERS: 'manage_users',
  VIEW_USERS: 'view_users',
  CREATE_USERS: 'create_users',
  EDIT_USERS: 'edit_users',
  DELETE_USERS: 'delete_users',

  // Role Management
  MANAGE_ROLES: 'manage_roles',
  VIEW_ROLES: 'view_roles',
  CREATE_ROLES: 'create_roles',
  EDIT_ROLES: 'edit_roles',
  DELETE_ROLES: 'delete_roles',

  // System Configuration
  MANAGE_SETTINGS: 'manage_settings',
  VIEW_SETTINGS: 'view_settings',
  EDIT_SETTINGS: 'edit_settings',

  // Financial Management
  MANAGE_FINANCES: 'manage_finances',
  VIEW_FINANCES: 'view_finances',
  CREATE_INVOICES: 'create_invoices',
  PROCESS_PAYMENTS: 'process_payments',

  // Agent Management
  MANAGE_AGENTS: 'manage_agents',
  VIEW_AGENTS: 'view_agents',
  CREATE_AGENTS: 'create_agents',
  EDIT_AGENTS: 'edit_agents',
  DELETE_AGENTS: 'delete_agents',

  // Reports & Analytics
  VIEW_REPORTS: 'view_reports',
  EXPORT_REPORTS: 'export_reports',
  VIEW_ANALYTICS: 'view_analytics'
} as const;

export const ADMIN_PERMISSIONS = Object.values(PERMISSIONS);

export const usePermissions = () => {
  const { user, isAuthenticated } = useAuth0();

  const hasPermission = (permission: string): boolean => {
    if (!isAuthenticated || !user) return false;

    const userPermissions = user['https://your-namespace/permissions'] || [];
    const userRoles = user['https://your-namespace/roles'] || [];

    // Super admin has all permissions
    if (userRoles.includes('admin')) return true;

    return userPermissions.includes(permission);
  };

  const hasAnyPermission = (permissions: string[]): boolean => {
    return permissions.some(permission => hasPermission(permission));
  };

  const hasAllPermissions = (permissions: string[]): boolean => {
    return permissions.every(permission => hasPermission(permission));
  };

  return {
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    isAdmin: isAuthenticated && user?.['https://your-namespace/roles']?.includes('admin')
  };
};