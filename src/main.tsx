import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { msalConfig } from './msalConfig.ts';
import './plugins/i18n';
import ApiProvider from './providers/apiProvider/index.tsx';
import GlobalProvider from './providers/globalProvider/index.tsx';

const msalInstance = new PublicClientApplication(msalConfig);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MsalProvider instance={msalInstance}>
      <ApiProvider>
        <GlobalProvider>
          <App />
        </GlobalProvider>
      </ApiProvider>
    </MsalProvider>
  </StrictMode>,
);
