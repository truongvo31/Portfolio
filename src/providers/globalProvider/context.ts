import { createContext, type Dispatch } from 'react';
import type { GlobalAction, GlobalState } from './types';

export const GlobalContext = createContext<
  { state: GlobalState; dispatch: Dispatch<GlobalAction> } | undefined
>(undefined);
