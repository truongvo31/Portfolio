import { Button, Toast, ToastBody, ToastTitle, ToastTrigger } from '@fluentui/react-components';
import { DismissRegular } from '@fluentui/react-icons';
import type { ReactNode } from 'react';

type ToastMessageProps = {
  title: ReactNode;
  body?: ReactNode;
};

const ToastMessage = ({ title, body }: ToastMessageProps) => {
  return (
    <Toast>
      <ToastTitle
        action={
          <ToastTrigger>
            <Button
              appearance="transparent"
              aria-label="Close"
              icon={<DismissRegular />}
              size="small"
            />
          </ToastTrigger>
        }
      >
        {title}
      </ToastTitle>
      {body ? <ToastBody>{body}</ToastBody> : null}
    </Toast>
  );
};

export default ToastMessage;
