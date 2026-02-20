import { MsalProvider, useMsal, useIsAuthenticated } from '@azure/msal-react';
import { PublicClientApplication, InteractionStatus } from '@azure/msal-browser';
import { msalConfig, loginRequest } from './msalConfig';
import { initGraphClient } from '../services/graphService';
import { ReactNode, useEffect, useState } from 'react';

const msalInstance = new PublicClientApplication(msalConfig);

/**
 * Initialize MSAL before React renders.
 * Must be awaited in main.tsx before calling createRoot.
 */
export async function initializeMsal() {
  console.log('[Auth] MSAL clientId:', import.meta.env.VITE_MSAL_CLIENT_ID ? 'SET' : 'NOT SET');
  console.log('[Auth] MSAL tenantId:', import.meta.env.VITE_MSAL_TENANT_ID ? 'SET' : 'NOT SET');
  console.log('[Auth] Initializing MSAL...');
  await msalInstance.initialize();
  console.log('[Auth] MSAL initialized successfully');
}

function AuthGate({ children }: { children: ReactNode }) {
  const { instance, inProgress } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    console.log('[Auth] AuthGate effect:', { inProgress, isAuthenticated });
    if (inProgress === InteractionStatus.None && !isAuthenticated) {
      // Check if MSAL is configured
      if (!import.meta.env.VITE_MSAL_CLIENT_ID) {
        console.log('[Auth] No client ID - running in demo mode');
        // No client ID configured - run in demo mode
        setIsReady(true);
        return;
      }
      console.log('[Auth] Starting loginRedirect...');
      instance.loginRedirect(loginRequest).catch((err) => {
        console.error('[Auth] loginRedirect failed:', err);
      });
    } else if (isAuthenticated) {
      // Initialize Graph client with the authenticated MSAL instance
      initGraphClient(instance as unknown as PublicClientApplication);
      setIsReady(true);
    }
  }, [instance, inProgress, isAuthenticated]);

  if (!import.meta.env.VITE_MSAL_CLIENT_ID) {
    // Demo mode - no auth configured
    return <>{children}</>;
  }

  if (!isReady) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: '#1E1E1E',
        color: '#00BCF2',
        fontFamily: "'Segoe UI', sans-serif",
        fontSize: '18px',
      }}>
        Signing in to Microsoft 365...
      </div>
    );
  }

  return <>{children}</>;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  return (
    <MsalProvider instance={msalInstance}>
      <AuthGate>{children}</AuthGate>
    </MsalProvider>
  );
}
