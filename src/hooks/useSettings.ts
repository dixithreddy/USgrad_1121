import { useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';
import { useSettingsStore } from '../stores/settingsStore';

export const useSettings = () => {
  const { user } = useAuth();
  const { settings, setSettings, updateSection } = useSettingsStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadSettings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      if (user?.user_metadata) {
        setSettings({
          general: {
            name: user.user_metadata.name || '',
            email: user.email || '',
            phone: user.user_metadata.phone || '',
            timezone: user.user_metadata.timezone || 'UTC',
            language: user.user_metadata.language || 'en'
          },
          notifications: user.user_metadata.notifications || {
            emailNotifications: true,
            applicationUpdates: true,
            documentSubmissions: true,
            deadlineReminders: true,
            marketingEmails: false
          },
          security: user.user_metadata.security || {
            twoFactorAuth: false,
            sessionTimeout: '30',
            passwordExpiry: '90',
            loginNotifications: true
          }
        });
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [user, setSettings]);

  const updateSettings = useCallback(async (section: string, data: any) => {
    try {
      setLoading(true);
      setError(null);

      const { error } = await supabase.auth.updateUser({
        data: {
          ...user?.user_metadata,
          [section]: data
        }
      });

      if (error) throw error;
      updateSection(section, data);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [user, updateSection]);

  return {
    settings,
    updateSettings,
    loadSettings,
    loading,
    error
  };
};