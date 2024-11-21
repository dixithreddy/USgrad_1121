import { useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth0 } from '@auth0/auth0-react';

export const useDatabase = () => {
  const { getAccessTokenSilently } = useAuth0();

  const fetchStudents = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('students')
        .select(`
          *,
          agent:agents(name),
          applications(
            id,
            status,
            program:programs(
              name,
              university:universities(name)
            )
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching students:', error);
      throw error;
    }
  }, []);

  const fetchUniversities = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('universities')
        .select(`
          *,
          programs(
            id,
            name,
            duration,
            tuition_fee,
            application_fee,
            deadline
          )
        `)
        .order('name');

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching universities:', error);
      throw error;
    }
  }, []);

  const fetchAgents = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('agents')
        .select(`
          *,
          students(id),
          applications:students(
            applications(id, status)
          )
        `)
        .order('name');

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching agents:', error);
      throw error;
    }
  }, []);

  const createStudent = useCallback(async (studentData: any) => {
    try {
      const { data, error } = await supabase
        .from('students')
        .insert([studentData])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating student:', error);
      throw error;
    }
  }, []);

  const updateStudent = useCallback(async (id: string, updates: any) => {
    try {
      const { data, error } = await supabase
        .from('students')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating student:', error);
      throw error;
    }
  }, []);

  const deleteStudent = useCallback(async (id: string) => {
    try {
      const { error } = await supabase
        .from('students')
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Error deleting student:', error);
      throw error;
    }
  }, []);

  return {
    fetchStudents,
    fetchUniversities,
    fetchAgents,
    createStudent,
    updateStudent,
    deleteStudent
  };
};