import React, { useState } from 'react';
import { QrCode, Copy, CheckCircle } from 'lucide-react';
import { authService } from '../../services/authService';

interface MFASetupProps {
  userId: string;
  onComplete: () => void;
}

const MFASetup: React.FC<MFASetupProps> = ({ userId, onComplete }) => {
  const [qrCode, setQrCode] = useState('');
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [verificationCode, setVerificationCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSetup = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await authService.setupMFA(userId);
      setQrCode(response.qrCode);
      setBackupCodes(response.backupCodes);
    } catch (err) {
      setError('Failed to setup MFA. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    try {
      setLoading(true);
      setError('');
      await authService.verifyMFA(userId, verificationCode);
      onComplete();
    } catch (err) {
      setError('Invalid verification code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Setup Two-Factor Authentication</h2>

      {!qrCode ? (
        <button
          onClick={handleSetup}
          disabled={loading}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Setting up...' : 'Start Setup'}
        </button>
      ) : (
        <div className="space-y-6">
          <div className="text-center">
            <QrCode className="w-48 h-48 mx-auto" />
            <p className="mt-2 text-sm text-gray-600">
              Scan this QR code with your authenticator app
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-2">Backup Codes</h3>
            <div className="grid grid-cols-2 gap-2">
              {backupCodes.map((code, index) => (
                <div
                  key={index}
                  className="p-2 bg-gray-50 rounded-lg text-center font-mono text-sm"
                >
                  {code}
                </div>
              ))}
            </div>
            <button
              onClick={() => navigator.clipboard.writeText(backupCodes.join('\n'))}
              className="mt-2 flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
            >
              <Copy className="w-4 h-4" />
              Copy all codes
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Verification Code
            </label>
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter 6-digit code"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}

          <button
            onClick={handleVerify}
            disabled={loading || !verificationCode}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Verifying...' : 'Verify and Complete'}
          </button>
        </div>
      )}
    </div>
  );
};

export default MFASetup;