import api from '../../utils/api';

export const emailService = {
  async sendEmail(data: {
    to: string[];
    subject: string;
    body: string;
    attachments?: File[];
  }) {
    return api.post('/integrations/email/send', data);
  },

  async syncEmails() {
    return api.post('/integrations/email/sync');
  },

  async getEmailTemplates() {
    return api.get('/integrations/email/templates');
  }
};