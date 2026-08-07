import { LogLevel } from '@azure/msal-browser';

const redirectUri = window.location.origin + `${import.meta.env.BASE_URL}admin`;

export const msalScopes = ['api://80cfda38-39bf-4563-8741-5e3922e12a3f/access_as_user'];

export const msalConfig = {
  auth: {
    clientId: '80cfda38-39bf-4563-8741-5e3922e12a3f',
    authority: 'https://login.microsoftonline.com/bb784c60-5ceb-4153-a3d7-83ef0a33399d',
    redirectUri,
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: false,
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
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
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
