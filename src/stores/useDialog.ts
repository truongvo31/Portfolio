import { useContext } from 'react';
import { AsyncDialogContext } from '../providers/dialogProvider/context';

const useDialog = () => {
  const context = useContext(AsyncDialogContext);
  if (!context) {
    throw new Error('useDialog must be used within an AsyncDialogProvider');
  }
  return context;
};

export default useDialog;
