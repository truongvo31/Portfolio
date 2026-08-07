import { useContext } from 'react';
import MessageDialog from '../components/messageDialog';
import { AsyncDialogContext } from '../providers/dialogProvider/context';

const useMessages = () => {
  const context = useContext(AsyncDialogContext);
  if (!context) {
    throw new Error('useMessages must be used within an AsyncDialogProvider');
  }
  const { prompt } = context;

  return {
    $info: async (title: string, message: string): Promise<false> => {
      await prompt({
        content: <MessageDialog title={title} message={message} type="info" />,
      });
      return false;
    },
    $warning: async (title: string, message: string): Promise<false> => {
      await prompt({
        content: <MessageDialog title={title} message={message} type="warning" />,
      });
      return false;
    },
    $error: async (title: string, message: string): Promise<false> => {
      await prompt({
        content: <MessageDialog title={title} message={message} type="error" />,
      });
      return false;
    },
    $success: async (title: string, message: string): Promise<false> => {
      await prompt({
        content: <MessageDialog title={title} message={message} type="success" />,
      });
      return false;
    },
    $confirm: async (title: string, message: string): Promise<boolean> => {
      const result = await prompt<boolean>({
        content: <MessageDialog title={title} message={message} type="confirm" />,
      });
      return result ?? false;
    },
  };
};

export default useMessages;
