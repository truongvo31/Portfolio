import { Toaster, useId, useToastController } from '@fluentui/react-components';
import { useMemo } from 'react';
import ToastMessage from '../../components/toastMessage';
import ToasterContext from './context';
import type { ToasterContextValue } from './types';

const ToasterProvider = ({ children }: { children: React.ReactNode }) => {
  const toasterId = useId('app-toaster');
  const { dispatchToast } = useToastController(toasterId);

  const createIntentToast =
    (intent: 'success' | 'info' | 'warning' | 'error') =>
    (
      title: React.ReactNode,
      body?: React.ReactNode,
      options?: Parameters<typeof dispatchToast>[1],
    ) => {
      dispatchToast(<ToastMessage title={title} body={body} />, {
        ...(options ?? {}),
        intent,
      });
    };

  const value = useMemo<ToasterContextValue>(
    () => ({
      dispatchToast,
      $success: createIntentToast('success'),
      $info: createIntentToast('info'),
      $warning: createIntentToast('warning'),
      $error: createIntentToast('error'),
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatchToast],
  );

  return (
    <ToasterContext.Provider value={value}>
      {children}
      <Toaster toasterId={toasterId} />
    </ToasterContext.Provider>
  );
};

export default ToasterProvider;
