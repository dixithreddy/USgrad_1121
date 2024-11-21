import api from '../../utils/api';

export const calendarService = {
  async createEvent(data: {
    title: string;
    start: Date;
    end: Date;
    description?: string;
    attendees?: string[];
  }) {
    return api.post('/integrations/calendar/events', data);
  },

  async syncEvents() {
    return api.post('/integrations/calendar/sync');
  },

  async getUpcomingEvents() {
    return api.get('/integrations/calendar/events/upcoming');
  }
};