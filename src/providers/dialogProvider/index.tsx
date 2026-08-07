import type { ReactElement } from 'react';
import { isValidElement, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import AsyncDialogContext from './context';
import type {
  AsyncDialogContextValue,
  AsyncDialogPromptOptions,
  AsyncDialogRenderable,
} from './types';

/**
 * Internal queued dialog request.
 *
 * Each item holds pre-built custom content and a resolver for the matching
 * `prompt` promise.
 */
type PendingDialog = {
  content: AsyncDialogRenderable;
  resolve: (value: unknown) => void;
};

const CLOSE_ANIMATION_MS = 220;

/**
 * Provides a centralized async dialog service.
 *
 * Responsibilities:
 * - Maintain a FIFO queue of prompt requests.
 * - Render only one custom dialog content node at a time.
 * - Resolve or cancel the active prompt and move to the next queued request.
 *
 * Non-responsibilities:
 * - Does not render dialog layout wrappers.
 * - Does not enforce dismiss policy or z-index.
 *
 * These UI concerns are intentionally owned by each custom dialog component.
 */
const AsyncDialogProvider = ({ children }: { children: React.ReactNode }) => {
  const [queue, setQueue] = useState<PendingDialog[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const queueRef = useRef<PendingDialog[]>([]);
  const isClosingRef = useRef(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentDialog = queue[0];

  useEffect(() => {
    queueRef.current = queue;
  }, [queue]);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  /**
   * Remove the currently active dialog from queue.
   */
  const popCurrentDialog = useCallback(() => {
    setQueue((previous) => previous.slice(1));
  }, []);

  /**
   * Complete the active prompt with a value and advance queue.
   *
   * No-op if there is no active dialog.
   */
  const resolveCurrentDialog = useCallback(
    (value: unknown) => {
      const dialog = queueRef.current[0];
      if (!dialog || isClosingRef.current) {
        return;
      }

      dialog.resolve(value);
      isClosingRef.current = true;
      setIsOpen(false);

      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }

      closeTimerRef.current = setTimeout(() => {
        const hasNextDialog = queueRef.current.length > 1;
        popCurrentDialog();
        isClosingRef.current = false;
        setIsOpen(hasNextDialog);
      }, CLOSE_ANIMATION_MS);
    },
    [popCurrentDialog],
  );

  /**
   * Cancel active prompt and resolve it as `undefined`.
   */
  const cancel = useCallback(() => {
    resolveCurrentDialog(undefined);
    return Promise.resolve();
  }, [resolveCurrentDialog]);

  /**
   * Resolve active prompt with a typed value.
   */
  const resolve = useCallback(
    <T,>(value: T) => {
      resolveCurrentDialog(value);
      return Promise.resolve();
    },
    [resolveCurrentDialog],
  );

  /**
   * Enqueue a new prompt request and return a promise tied to that request.
   */
  const prompt = useCallback(<T,>(options: AsyncDialogPromptOptions): Promise<T | undefined> => {
    return new Promise<T | undefined>((promiseResolve) => {
      if (!isClosingRef.current && queueRef.current.length === 0) {
        setIsOpen(true);
      }

      setQueue((previous) => [
        ...previous,
        {
          content: options.content,
          resolve: (value) => {
            promiseResolve(value as T | undefined);
          },
        },
      ]);
    });
  }, []);

  /**
   * Stable API object for consumers.
   */
  const contextValue = useMemo<AsyncDialogContextValue>(
    () => ({
      prompt,
      isOpen,
      resolve,
      cancel,
    }),
    [prompt, isOpen, resolve, cancel],
  );

  /**
   * Render the first queued dialog content.
   *
   * Supports either JSX element payloads or component types.
   */
  const renderedContent = useMemo(() => {
    if (!currentDialog) {
      return null;
    }

    if (isValidElement(currentDialog.content)) {
      return currentDialog.content as ReactElement;
    }

    const Content = currentDialog.content;
    return <Content />;
  }, [currentDialog]);

  return (
    <AsyncDialogContext.Provider value={contextValue}>
      {renderedContent}
      {children}
    </AsyncDialogContext.Provider>
  );
};

export default AsyncDialogProvider;
