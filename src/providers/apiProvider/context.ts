import { createContext } from 'react';
import type { ApiContextValue } from './types';

const ApiContext = createContext<ApiContextValue | null>(null);

export default ApiContext;
