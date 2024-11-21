import { useState, useCallback } from 'react';
import api from '../utils/api';

export const useBackup = () => {
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [lastBackupStatus, setLastBackupStatus] = useState<{
    timestamp: string;
    status: 'success' | 'failed';
    error?: string;
  } | null>(null);

  const initiateBackup = useCallback(async () => {
    setIsBackingUp(true);
    try {
      const response = await api.post('/backups/create');
      setLastBackupStatus({
        timestamp: new Date().toISOString(),
        status: 'success'
      });
      return response.data;
    } catch (error) {
      setLastBackupStatus({
        timestamp: new Date().toISOString(),
        status: 'failed',
        error: 'Backup failed'
      });
      throw error;
    } finally {
      setIsBackingUp(false);
    }
  }, []);

  const restoreBackup = useCallback(async (backupId: string) => {
    try {
      const response = await api.post(`/backups/restore/${backupId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }, []);

  return {
    initiateBackup,
    restoreBackup,
    isBackingUp,
    lastBackupStatus
  };
};