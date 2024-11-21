import { encryptData, decryptData, generateSecureToken } from './encryption';

const SESSION_KEY = 'user_session';
const SESSION_DURATION = 30 * 60 * 1000; // 30 minutes

interface SessionData {
  token: string;
  userId: string;
  role: string;
  expires: number;
}

export const sessionManager = {
  createSession(userId: string, role: string): void {
    const sessionData: SessionData = {
      token: generateSecureToken(),
      userId,
      role,
      expires: Date.now() + SESSION_DURATION
    };
    
    const encryptedSession = encryptData(sessionData);
    localStorage.setItem(SESSION_KEY, encryptedSession);
  },

  getSession(): SessionData | null {
    const encryptedSession = localStorage.getItem(SESSION_KEY);
    if (!encryptedSession) return null;

    try {
      const session = decryptData(encryptedSession) as SessionData;
      if (Date.now() > session.expires) {
        this.clearSession();
        return null;
      }
      return session;
    } catch {
      this.clearSession();
      return null;
    }
  },

  updateSession(): void {
    const session = this.getSession();
    if (session) {
      session.expires = Date.now() + SESSION_DURATION;
      const encryptedSession = encryptData(session);
      localStorage.setItem(SESSION_KEY, encryptedSession);
    }
  },

  clearSession(): void {
    localStorage.removeItem(SESSION_KEY);
  },

  isSessionValid(): boolean {
    const session = this.getSession();
    return session !== null;
  }
};