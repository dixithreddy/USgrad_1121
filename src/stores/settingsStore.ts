import { create } from 'zustand';

interface SettingsState {
  settings: {
    general: {
      name: string;
      email: string;
      phone: string;
      timezone: string;
      language: string;
    };
    notifications: {
      emailNotifications: boolean;
      applicationUpdates: boolean;
      documentSubmissions: boolean;
      deadlineReminders: boolean;
      marketingEmails: boolean;
    };
    security: {
      twoFactorAuth: boolean;
      sessionTimeout: string;
      passwordExpiry: string;
      loginNotifications: boolean;
    };
  };
  setSettings: (settings: any) => void;
  updateSection: (section: string, data: any) => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  settings: {
    general: {
      name: '',
      email: '',
      phone: '',
      timezone: 'UTC',
      language: 'en'
    },
    notifications: {
      emailNotifications: true,
      applicationUpdates: true,
      documentSubmissions: true,
      deadlineReminders: true,
      marketingEmails: false
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: '30',
      passwordExpiry: '90',
      loginNotifications: true
    }
  },
  setSettings: (settings) => set({ settings }),
  updateSection: (section, data) => set((state) => ({
    settings: {
      ...state.settings,
      [section]: {
        ...state.settings[section as keyof typeof state.settings],
        ...data
      }
    }
  }))
}));