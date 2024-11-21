import React, { createContext, useContext, ReactNode } from 'react';
import { useAgencyData } from '../../hooks/useAgencyData';
import { useAuth } from '../../hooks/useAuth';

interface AgencyDataContextType {
  fetchAgencyData: (dataType: string) => Promise<any>;
  modifyAgencyData: (action: 'create' | 'update' | 'delete', dataType: string, data: any, id?: string) => Promise<any>;
  loading: boolean;
  error: string | null;
}

const AgencyDataContext = createContext<AgencyDataContextType | undefined>(undefined);

interface AgencyDataProviderProps {
  children: ReactNode;
}

export const AgencyDataProvider: React.FC<AgencyDataProviderProps> = ({ children }) => {
  const { fetchAgencyData, modifyAgencyData, loading, error } = useAgencyData();
  const { user } = useAuth();

  if (!user?.['https://your-namespace/agency_id']) {
    return <div>Unauthorized: No agency context found</div>;
  }

  return (
    <AgencyDataContext.Provider value={{
      fetchAgencyData,
      modifyAgencyData,
      loading,
      error
    }}>
      {children}
    </AgencyDataContext.Provider>
  );
};

export const useAgencyDataContext = () => {
  const context = useContext(AgencyDataContext);
  if (context === undefined) {
    throw new Error('useAgencyDataContext must be used within an AgencyDataProvider');
  }
  return context;
};