import { InteractionStatus } from '@azure/msal-browser';
import { useIsAuthenticated, useMsal } from '@azure/msal-react';
import { Spinner } from '@fluentui/react-components';
import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { loginRequest, msalScopes } from '../msalConfig';
import useApi from '../stores/useApi';

type AdminAuthGuardProps = {
  children?: ReactNode;
};

const AdminAuthGuard = ({ children }: AdminAuthGuardProps) => {
  const { t } = useTranslation();
  const isAuthenticated = useIsAuthenticated();
  const { instance, inProgress, accounts } = useMsal();
  const { setHeader } = useApi();
  const hasAttemptedLoginRef = useRef(false);
  const [readyAccountId, setReadyAccountId] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;

    if (!isAuthenticated) {
      setHeader('Authorization', null);
      if (readyAccountId !== null) {
        queueMicrotask(() => {
          if (isActive) {
            setReadyAccountId(null);
          }
        });
      }

      if (inProgress === InteractionStatus.None && !hasAttemptedLoginRef.current) {
        hasAttemptedLoginRef.current = true;
        instance.loginRedirect(loginRequest).catch((error) => {
          console.error(error);
          hasAttemptedLoginRef.current = false;
        });
      }

      return () => {
        isActive = false;
      };
    }

    const account = accounts[0] ?? instance.getActiveAccount();

    if (inProgress !== InteractionStatus.None || !account) {
      return () => {
        isActive = false;
      };
    }

    if (readyAccountId === account.homeAccountId) {
      return () => {
        isActive = false;
      };
    }

    void instance
      .acquireTokenSilent({
        scopes: msalScopes,
        account,
      })
      .then((response) => {
        if (!isActive) {
          return;
        }

        setHeader('Authorization', `Bearer ${response.accessToken}`);
        setReadyAccountId(account.homeAccountId);
        hasAttemptedLoginRef.current = false;
      })
      .catch((error) => {
        if (!isActive) {
          return;
        }

        setHeader('Authorization', null);
        setReadyAccountId(null);
        console.error('Silent token acquisition failed:', error);

        if (inProgress === InteractionStatus.None && !hasAttemptedLoginRef.current) {
          hasAttemptedLoginRef.current = true;
          instance.loginRedirect(loginRequest).catch((redirectError) => {
            console.error(redirectError);
            hasAttemptedLoginRef.current = false;
          });
        }
      });

    return () => {
      isActive = false;
    };
  }, [accounts, inProgress, instance, isAuthenticated, readyAccountId, setHeader]);

  const account = accounts[0] ?? instance.getActiveAccount() ?? null;

  const isTokenReady =
    isAuthenticated && account !== null && readyAccountId === account.homeAccountId;
  const isLoading = !isTokenReady;

  if (isLoading) {
    return (
      <div className="flex min-h-dvh items-center justify-center">
        <Spinner label={t('app.loading')} labelPosition="below" size="extra-large" />
      </div>
    );
  }

  return children;
};

export default AdminAuthGuard;
