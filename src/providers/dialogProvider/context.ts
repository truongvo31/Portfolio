import { createContext } from 'react';
import type { AsyncDialogContextValue } from './types';

/**
 * Context channel for the async dialog service.
 *
 * The default value is `null` by design so hooks can throw a clear error
 * when used outside the provider.
 */
export const AsyncDialogContext = createContext<AsyncDialogContextValue | null>(null);

export default AsyncDialogContext;
