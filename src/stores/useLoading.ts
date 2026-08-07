import { useContext } from 'react';
import LoadingContext from '../providers/loadingProvider/context';

/**
 * Access the loading context API.
 *
 * @throws Error when used outside LoadingProvider.
 */
const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};

export default useLoading;
