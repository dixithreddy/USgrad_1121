import { create } from 'zustand';
import { supabase } from '../lib/supabase';

interface DataState {
  universities: any[];
  students: any[];
  agents: any[];
  loading: boolean;
  error: string | null;
  setUniversities: (universities: any[]) => void;
  setStudents: (students: any[]) => void;
  setAgents: (agents: any[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  fetchData: (table: string) => Promise<any[]>;
}

export const useDataStore = create<DataState>((set) => ({
  universities: [],
  students: [],
  agents: [],
  loading: false,
  error: null,
  setUniversities: (universities) => set({ universities }),
  setStudents: (students) => set({ students }),
  setAgents: (agents) => set({ agents }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  fetchData: async (table: string) => {
    try {
      set({ loading: true, error: null });
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      switch (table) {
        case 'universities':
          set({ universities: data });
          break;
        case 'students':
          set({ students: data });
          break;
        case 'agents':
          set({ agents: data });
          break;
      }

      return data;
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    } finally {
      set({ loading: false });
    }
  }
}));