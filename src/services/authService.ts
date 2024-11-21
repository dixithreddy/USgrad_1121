import { Auth0Client } from '@auth0/auth0-spa-js';
import { sessionManager } from '../utils/sessionManager';
import { encryptData } from '../utils/encryption';
import api from '../utils/api';

const auth0 = new Auth0Client({
  domain: import.meta.env.VITE_AUTH0_DOMAIN,
  clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
  authorizationParams: {
    redirect_uri: window.location.origin,
    audience: import.meta.env.VITE_AUTH0_AUDIENCE,
    scope: 'openid profile email'
  }
});

export const authService = {
  async login(email: string, password: string) {
    try {
      await auth0.loginWithRedirect({
        authorizationParams: {
          prompt: 'login',
          login_hint: email
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  async handleRedirectCallback() {
    try {
      const result = await auth0.handleRedirectCallback();
      const user = await auth0.getUser();
      const token = await auth0.getTokenSilently();

      if (user) {
        sessionManager.createSession(user.sub, user['https://your-namespace/roles'][0]);
        await this.logLoginActivity(user.sub);
      }

      return { user, token };
    } catch (error) {
      console.error('Callback error:', error);
      throw error;
    }
  },

  async setupMFA(userId: string) {
    try {
      const response = await api.post('/auth/mfa/setup', { userId });
      return response.data;
    } catch (error) {
      console.error('MFA setup error:', error);
      throw error;
    }
  },

  async verifyMFA(userId: string, code: string) {
    try {
      const response = await api.post('/auth/mfa/verify', { userId, code });
      return response.data;
    } catch (error) {
      console.error('MFA verification error:', error);
      throw error;
    }
  },

  async initiatePasswordReset(email: string) {
    try {
      await auth0.changePassword({
        email,
        connection: 'Username-Password-Authentication'
      });
    } catch (error) {
      console.error('Password reset error:', error);
      throw error;
    }
  },

  async logLoginActivity(userId: string) {
    try {
      const activity = {
        userId,
        timestamp: new Date().toISOString(),
        ipAddress: await this.getClientIP(),
        userAgent: navigator.userAgent,
        location: await this.getLocation()
      };

      await api.post('/auth/activity', {
        data: encryptData(activity)
      });
    } catch (error) {
      console.error('Activity logging error:', error);
    }
  },

  private async getClientIP(): Promise<string> {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch {
      return 'unknown';
    }
  },

  private async getLocation(): Promise<{ country: string; city: string }> {
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      return {
        country: data.country_name,
        city: data.city
      };
    } catch {
      return {
        country: 'unknown',
        city: 'unknown'
      };
    }
  }
};