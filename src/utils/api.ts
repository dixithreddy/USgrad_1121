import axios from 'axios';
import { sessionManager } from './sessionManager';
import { encryptData } from './encryption';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const session = sessionManager.getSession();
    if (session) {
      config.headers.Authorization = `Bearer ${session.token}`;
    }

    // Encrypt sensitive data
    if (config.data && config.headers['x-encrypt-data']) {
      config.data = encryptData(config.data);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    sessionManager.updateSession();
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      sessionManager.clearSession();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;