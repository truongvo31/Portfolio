import type { useToastController } from '@fluentui/react-components';
import type { ReactNode } from 'react';

type ToastDispatch = ReturnType<typeof useToastController>['dispatchToast'];

type ToastDispatchOptions = Parameters<ToastDispatch>[1];

export type ToasterContextValue = {
  dispatchToast: ToastDispatch;
  $success: (
    title: ReactNode,
    body?: ReactNode,
    options?: Omit<ToastDispatchOptions, 'intent'>,
  ) => void;
  $info: (
    title: ReactNode,
    body?: ReactNode,
    options?: Omit<ToastDispatchOptions, 'intent'>,
  ) => void;
  $warning: (
    title: ReactNode,
    body?: ReactNode,
    options?: Omit<ToastDispatchOptions, 'intent'>,
  ) => void;
  $error: (
    title: ReactNode,
    body?: ReactNode,
    options?: Omit<ToastDispatchOptions, 'intent'>,
  ) => void;
};
