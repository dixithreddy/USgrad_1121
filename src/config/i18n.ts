import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // English translations
      common: {
        dashboard: 'Dashboard',
        universities: 'Universities',
        students: 'Students',
        agents: 'Agents',
        documents: 'Documents',
        settings: 'Settings'
      }
    }
  },
  es: {
    translation: {
      // Spanish translations
      common: {
        dashboard: 'Panel de Control',
        universities: 'Universidades',
        students: 'Estudiantes',
        agents: 'Agentes',
        documents: 'Documentos',
        settings: 'Configuración'
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;