import { useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';

export const useSupabaseData = (table: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const { data, error: fetchError } = await supabase
        .from(table)
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      return data;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [table]);

  const addData = useCallback(async (data: any) => {
    try {
      setLoading(true);
      setError(null);
      const { data: result, error: insertError } = await supabase
        .from(table)
        .insert([data])
        .select();

      if (insertError) throw insertError;
      return result[0];
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [table]);

  const updateData = useCallback(async (id: string, data: any) => {
    try {
      setLoading(true);
      setError(null);
      const { data: result, error: updateError } = await supabase
        .from(table)
        .update(data)
        .eq('id', id)
        .select();

      if (updateError) throw updateError;
      return result[0];
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [table]);

  const deleteData = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const { error: deleteError } = await supabase
        .from(table)
        .delete()
        .eq('id', id);

      if (deleteError) throw deleteError;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [table]);

  return {
    loading,
    error,
    fetchData,
    addData,
    updateData,
    deleteData
  };
};