import { LogLevel, type Configuration } from '@azure/msal-browser';

const tenantId = import.meta.env.VITE_MSAL_TENANT_ID;
const clientId = import.meta.env.VITE_MSAL_CLIENT_ID;
const redirectUri = new URL(`${import.meta.env.BASE_URL}admin`, window.location.origin).toString();
const authority = new URL(tenantId, 'https://login.microsoftonline.com').href;

export const msalScopes = [`api://${clientId}/${import.meta.env.VITE_MSAL_SCOPE}`];

export const msalConfig: Configuration = {
  auth: {
    clientId,
    authority,
    redirectUri,
  },
  cache: {
    cacheLocation: 'sessionStorage',
  },
  system: {
    loggerOptions: {
      loggerCallback: (level: LogLevel, message: string, containsPii: boolean) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          // case LogLevel.Info:
          //   console.info(message);
          //   return;
          // case LogLevel.Verbose:
          //   console.debug(message);
          //   return;
          // case LogLevel.Warning:
          //   console.warn(message);
          //   return;
          default:
            return;
        }
      },
    },
  },
};

export const loginRequest = {
  scopes: msalScopes,
  prompt: 'select_account',
};
