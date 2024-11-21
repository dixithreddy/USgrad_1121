import { useCallback } from 'react';
import { useAuth } from './useAuth';
import api from '../utils/api';

interface AuditLogData {
  action: string;
  details: string;
  metadata?: Record<string, any>;
}

export const useAuditLog = () => {
  const { user, getUserRole } = useAuth();

  const logAction = useCallback(async (data: AuditLogData) => {
    try {
      const logEntry = {
        ...data,
        userId: user?.sub,
        userEmail: user?.email,
        userRole: getUserRole(),
        timestamp: new Date().toISOString(),
        ipAddress: window.sessionStorage.getItem('user_ip'),
        userAgent: navigator.userAgent
      };

      await api.post('/audit-logs', logEntry);
    } catch (error) {
      console.error('Failed to log audit action:', error);
    }
  }, [user, getUserRole]);

  return { logAction };
};