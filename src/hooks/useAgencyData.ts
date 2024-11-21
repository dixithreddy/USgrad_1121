import { useState, useCallback } from 'react';
import { useAuth } from './useAuth';
import { AgencyDataService } from '../services/agencyDataService';
import { useAuditLog } from './useAuditLog';

export const useAgencyData = () => {
  const { user, getAccessToken } = useAuth();
  const { logAction } = useAuditLog();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const agencyId = user?.['https://your-namespace/agency_id'];
  const encryptionKey = import.meta.env.VITE_AGENCY_ENCRYPTION_KEY;

  const dataService = new AgencyDataService(agencyId, encryptionKey);

  const fetchAgencyData = useCallback(async (dataType: string) => {
    try {
      setLoading(true);
      setError(null);

      let data;
      switch (dataType) {
        case 'students':
          data = await dataService.getStudents();
          break;
        case 'applications':
          data = await dataService.getApplications();
          break;
        case 'documents':
          data = await dataService.getDocuments();
          break;
        default:
          throw new Error('Invalid data type');
      }

      await logAction({
        action: 'DATA_ACCESS',
        details: `Accessed ${dataType} data`,
        metadata: { dataType, agencyId }
      });

      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [agencyId, dataService, logAction]);

  const modifyAgencyData = useCallback(async (
    action: 'create' | 'update' | 'delete',
    dataType: string,
    data: any,
    id?: string
  ) => {
    try {
      setLoading(true);
      setError(null);

      let result;
      switch (action) {
        case 'create':
          result = await dataService.createStudent(data);
          break;
        case 'update':
          if (!id) throw new Error('ID required for update');
          result = await dataService.updateStudent(id, data);
          break;
        default:
          throw new Error('Invalid action');
      }

      await logAction({
        action: `DATA_${action.toUpperCase()}`,
        details: `${action} ${dataType} data`,
        metadata: { dataType, agencyId, id }
      });

      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [agencyId, dataService, logAction]);

  return {
    fetchAgencyData,
    modifyAgencyData,
    loading,
    error
  };
};