import api from '../../utils/api';

export const storageService = {
  async uploadFile(file: File, path: string) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('path', path);
    
    return api.post('/integrations/storage/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },

  async listFiles(path: string) {
    return api.get(`/integrations/storage/files?path=${path}`);
  },

  async downloadFile(fileId: string) {
    return api.get(`/integrations/storage/files/${fileId}/download`, {
      responseType: 'blob'
    });
  }
};