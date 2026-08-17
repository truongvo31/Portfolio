import { InteractionStatus } from '@azure/msal-browser';
import { useIsAuthenticated, useMsal } from '@azure/msal-react';
import { Spinner } from '@fluentui/react-components';
import type { ReactNode } from 'react';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { loginRequest } from '../../msalConfig';

type AdminAuthGuardProps = {
  children?: ReactNode;
};

const AdminAuthGuard = ({ children }: AdminAuthGuardProps) => {
  const { t } = useTranslation();
  const isAuthenticated = useIsAuthenticated();
  const { instance, inProgress, accounts } = useMsal();
  const hasAttemptedLoginRef = useRef(false);

  useEffect(() => {
    if (!isAuthenticated) {
      if (inProgress === InteractionStatus.None && !hasAttemptedLoginRef.current) {
        hasAttemptedLoginRef.current = true;
        instance.loginRedirect(loginRequest).catch((error) => {
          console.error(error);
          hasAttemptedLoginRef.current = false;
        });
      }

      return;
    }

    const account = accounts[0] ?? instance.getActiveAccount();

    if (inProgress !== InteractionStatus.None || !account) {
      return;
    }

    hasAttemptedLoginRef.current = false;
  }, [accounts, inProgress, instance, isAuthenticated]);

  const account = accounts[0] ?? instance.getActiveAccount() ?? null;

  const isLoading = !isAuthenticated || inProgress !== InteractionStatus.None || account === null;

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
