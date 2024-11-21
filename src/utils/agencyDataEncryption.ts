import CryptoJS from 'crypto-js';

export class AgencyDataEncryption {
  private readonly encryptionKey: string;
  private readonly agencyId: string;

  constructor(encryptionKey: string, agencyId: string) {
    this.encryptionKey = encryptionKey;
    this.agencyId = agencyId;
  }

  encrypt(data: any): string {
    const dataWithContext = {
      ...data,
      agencyId: this.agencyId,
      timestamp: new Date().toISOString()
    };
    
    return CryptoJS.AES.encrypt(
      JSON.stringify(dataWithContext),
      this.encryptionKey
    ).toString();
  }

  decrypt(encryptedData: string): any {
    const bytes = CryptoJS.AES.decrypt(encryptedData, this.encryptionKey);
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    // Verify data belongs to correct agency
    if (decryptedData.agencyId !== this.agencyId) {
      throw new Error('Data integrity check failed');
    }

    return decryptedData;
  }

  // Field-level encryption for sensitive data
  encryptField(value: string): string {
    return CryptoJS.AES.encrypt(value, this.encryptionKey).toString();
  }

  decryptField(encryptedValue: string): string {
    const bytes = CryptoJS.AES.decrypt(encryptedValue, this.encryptionKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
}