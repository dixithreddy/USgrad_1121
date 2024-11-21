import { useCallback } from 'react';
import { supabase } from '../lib/supabase';

export const useSupabase = () => {
  const getStudents = useCallback(async () => {
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }, []);

  const getUniversities = useCallback(async () => {
    const { data, error } = await supabase
      .from('universities')
      .select('*')
      .order('name');

    if (error) throw error;
    return data;
  }, []);

  const createStudent = useCallback(async (studentData: any) => {
    const { data, error } = await supabase
      .from('students')
      .insert([studentData])
      .select();

    if (error) throw error;
    return data[0];
  }, []);

  const updateStudent = useCallback(async (id: string, updates: any) => {
    const { data, error } = await supabase
      .from('students')
      .update(updates)
      .eq('id', id)
      .select();

    if (error) throw error;
    return data[0];
  }, []);

  const deleteStudent = useCallback(async (id: string) => {
    const { error } = await supabase
      .from('students')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }, []);

  return {
    getStudents,
    getUniversities,
    createStudent,
    updateStudent,
    deleteStudent
  };
};