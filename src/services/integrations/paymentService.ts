import api from '../../utils/api';

export const paymentService = {
  async createPaymentIntent(data: {
    amount: number;
    currency: string;
    description: string;
  }) {
    return api.post('/integrations/payments/intent', data);
  },

  async getPaymentMethods() {
    return api.get('/integrations/payments/methods');
  },

  async processRefund(paymentId: string, amount: number) {
    return api.post(`/integrations/payments/${paymentId}/refund`, { amount });
  }
};