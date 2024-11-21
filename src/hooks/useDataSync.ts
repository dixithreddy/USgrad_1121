import { useCallback } from 'react';
import { useDataStore } from '../stores/dataStore';
import { supabase } from '../lib/supabase';

export const useDataSync = (table: string) => {
  const { loading, error, fetchData, setLoading, setError } = useDataStore();

  const fetch = useCallback(async () => {
    return fetchData(table);
  }, [table, fetchData]);

  const insert = useCallback(async (data: any) => {
    try {
      setLoading(true);
      setError(null);
      
      const { data: result, error } = await supabase
        .from(table)
        .insert([data])
        .select();

      if (error) throw error;
      
      // Refresh the data after insertion
      await fetchData(table);
      
      return result[0];
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [table, fetchData, setLoading, setError]);

  const update = useCallback(async (id: string, data: any) => {
    try {
      setLoading(true);
      setError(null);
      
      const { data: result, error } = await supabase
        .from(table)
        .update(data)
        .eq('id', id)
        .select();

      if (error) throw error;
      
      // Refresh the data after update
      await fetchData(table);
      
      return result[0];
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [table, fetchData, setLoading, setError]);

  const remove = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const { error } = await supabase
        .from(table)
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      // Refresh the data after deletion
      await fetchData(table);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [table, fetchData, setLoading, setError]);

  return {
    fetch,
    insert,
    update,
    remove,
    loading,
    error
  };
};