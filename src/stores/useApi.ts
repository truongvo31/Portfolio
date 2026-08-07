import { useContext } from 'react';
import ApiContext from '../providers/apiProvider/context';

/**
 * Access the API context API.
 *
 * @throws Error when used outside ApiProvider.
 */
const useApi = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('useApi must be used within an ApiProvider');
  }
  return context;
};

export default useApi;
