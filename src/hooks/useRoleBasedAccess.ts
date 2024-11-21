import { usePermissions } from './usePermissions';
import { ROLES, ROLE_PERMISSIONS } from '../constants/roles';

export const useRoleBasedAccess = () => {
  const { hasPermission } = usePermissions();

  const canAccessFinancials = () => {
    return !hasPermission(ROLES.EMPLOYEE);
  };

  const canManageAgents = () => {
    return !hasPermission(ROLES.EMPLOYEE);
  };

  const canManageUniversities = () => {
    return !hasPermission(ROLES.EMPLOYEE);
  };

  const canAccessFullReports = () => {
    return !hasPermission(ROLES.EMPLOYEE);
  };

  const getEmployeePermissions = () => {
    return ROLE_PERMISSIONS[ROLES.EMPLOYEE];
  };

  return {
    canAccessFinancials,
    canManageAgents,
    canManageUniversities,
    canAccessFullReports,
    getEmployeePermissions
  };
};