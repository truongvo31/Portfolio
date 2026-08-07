import { Spinner } from '@fluentui/react-components';
import { useQuery } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import api from '../helpers/apiHelper';

type SessionGuardProps = {
  children?: ReactNode;
  fallback: ReactNode;
};

const SessionGuard = ({ children, fallback }: SessionGuardProps) => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const sessionToken = searchParams.get('session');
  const [isSessionValid, setIsSessionValid] = useState(false);

  const { isLoading } = useQuery<boolean>({
    queryKey: ['validateSession', sessionToken],
    queryFn: async () => {
      if (!sessionToken) {
        return false;
      }
      const { data: isAllowed, error } = await api.$get<boolean>(
        `client/validate-session/${sessionToken}`,
      );
      if (error) {
        setIsSessionValid(false);
        return false;
      }
      setIsSessionValid(isAllowed);
      return isAllowed;
    },
  });

  if (isLoading) {
    return (
      <div className="flex min-h-dvh items-center justify-center">
        <Spinner label={t('app.loading')} labelPosition="below" size="extra-large" />
      </div>
    );
  }

  return isSessionValid ? children : fallback;
};

export default SessionGuard;
