import { useContext } from 'react';
import ToasterContext from '../providers/toasterProvider/context';

const useToaster = () => {
  const context = useContext(ToasterContext);

  if (!context) {
    throw new Error('useToaster must be used within a ToasterProvider');
  }

  return context;
};

export default useToaster;
