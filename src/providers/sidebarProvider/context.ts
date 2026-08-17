import { createContext } from 'react';
import type { SidebarContextType } from './types';

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export default SidebarContext;
