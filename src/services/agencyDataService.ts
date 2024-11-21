import api from '../utils/api';
import { encryptData, decryptData } from '../utils/encryption';

export class AgencyDataService {
  private agencyId: string;
  private encryptionKey: string;

  constructor(agencyId: string, encryptionKey: string) {
    this.agencyId = agencyId;
    this.encryptionKey = encryptionKey;
  }

  // Data Access Methods with Encryption
  async getStudents() {
    const response = await api.get(`/agencies/${this.agencyId}/students`, {
      headers: { 'x-agency-id': this.agencyId }
    });
    return this.decryptData(response.data);
  }

  async getApplications() {
    const response = await api.get(`/agencies/${this.agencyId}/applications`, {
      headers: { 'x-agency-id': this.agencyId }
    });
    return this.decryptData(response.data);
  }

  async getDocuments() {
    const response = await api.get(`/agencies/${this.agencyId}/documents`, {
      headers: { 'x-agency-id': this.agencyId }
    });
    return this.decryptData(response.data);
  }

  // Data Modification Methods
  async createStudent(data: any) {
    const encryptedData = this.encryptData(data);
    return api.post(`/agencies/${this.agencyId}/students`, encryptedData, {
      headers: {
        'x-agency-id': this.agencyId,
        'x-encrypt-data': 'true'
      }
    });
  }

  async updateStudent(studentId: string, data: any) {
    const encryptedData = this.encryptData(data);
    return api.put(`/agencies/${this.agencyId}/students/${studentId}`, encryptedData, {
      headers: {
        'x-agency-id': this.agencyId,
        'x-encrypt-data': 'true'
      }
    });
  }

  // Utility Methods
  private encryptData(data: any): string {
    return encryptData({ ...data, agencyId: this.agencyId });
  }

  private decryptData(encryptedData: string): any {
    const data = decryptData(encryptedData);
    if (data.agencyId !== this.agencyId) {
      throw new Error('Data integrity check failed');
    }
    return data;
  }
}