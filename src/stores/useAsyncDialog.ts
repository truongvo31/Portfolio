import { useContext } from 'react';
import AsyncDialogContext from '../providers/dialogProvider/context';

/**
 * Access the async dialog service.
 *
 * Use this hook in both caller components (to open prompts) and custom dialog
 * components (to call `resolve` or `cancel`).
 *
 * @throws Error when used outside `AsyncDialogProvider`.
 */
const useAsyncDialog = () => {
  const context = useContext(AsyncDialogContext);
  if (!context) {
    throw new Error('useAsyncDialog must be used within an AsyncDialogProvider');
  }
  return context;
};

export default useAsyncDialog;
