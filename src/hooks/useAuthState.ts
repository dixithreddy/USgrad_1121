import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { supabase } from '../lib/supabase';

export const useAuthState = () => {
  const { 
    isAuthenticated, 
    isLoading, 
    user, 
    getAccessTokenSilently,
    loginWithRedirect,
    logout
  } = useAuth0();

  useEffect(() => {
    const setupSupabase = async () => {
      if (isAuthenticated && user) {
        const token = await getAccessTokenSilently();
        
        // Set Supabase auth session
        await supabase.auth.setSession({
          access_token: token,
          refresh_token: ''
        });
      }
    };

    setupSupabase();
  }, [isAuthenticated, user, getAccessTokenSilently]);

  const handleLogin = async () => {
    try {
      await loginWithRedirect({
        appState: { returnTo: '/dashboard' },
        authorizationParams: {
          prompt: 'login',
          screen_hint: 'login'
        }
      });
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleLogout = async () => {
    try {
      // Clear Supabase session
      await supabase.auth.signOut();
      
      // Logout from Auth0
      await logout({ 
        logoutParams: {
          returnTo: window.location.origin 
        }
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return {
    isAuthenticated,
    isLoading,
    user,
    login: handleLogin,
    logout: handleLogout
  };
};