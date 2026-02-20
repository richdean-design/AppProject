import type { Configuration } from '@azure/msal-browser';
import { LogLevel } from '@azure/msal-browser';

export const msalConfig: Configuration = {
  auth: {
    clientId: import.meta.env.VITE_MSAL_CLIENT_ID || '',
    authority: `https://login.microsoftonline.com/${import.meta.env.VITE_MSAL_TENANT_ID || 'common'}`,
    redirectUri: import.meta.env.VITE_MSAL_REDIRECT_URI || window.location.origin,
  },
  cache: {
    cacheLocation: 'localStorage',
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) return;
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            break;
          case LogLevel.Warning:
            console.warn(message);
            break;
          case LogLevel.Info:
            console.info(message);
            break;
        }
      },
      logLevel: LogLevel.Info,
    },
  },
};

export const graphScopes = [
  'User.Read',
  'User.Read.All',
  'Group.Read.All',
  'Device.Read.All',
  'Application.Read.All',
  'SecurityEvents.Read.All',
  'Reports.Read.All',
  'Directory.Read.All',
];

export const loginRequest = {
  scopes: graphScopes,
};
