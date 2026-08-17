import { createContext } from 'react';
import type { ToasterContextValue } from './types';

const ToasterContext = createContext<ToasterContextValue | null>(null);

export default ToasterContext;
