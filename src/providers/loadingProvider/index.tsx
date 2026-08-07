import { lazy, Suspense, useCallback, useMemo, useState } from 'react';
import LoadingContext from './context';

const LoadingOverlay = lazy(() => import('../../components/loadingOverlay'));

const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
  const [loadingCount, setLoadingCount] = useState(0);
  const [externalLoading, setExternalLoadingState] = useState(false);
  const [message, setMessage] = useState<string | undefined>();
  const [progress, setProgress] = useState<number | undefined>();

  const isLoading = loadingCount > 0 || externalLoading;

  /**
   * Enter loading state and optionally set the initial message.
   */
  const showLoading = useCallback((nextMessage?: string) => {
    setMessage(nextMessage);
    setLoadingCount((count) => count + 1);
  }, []);

  /**
   * Exit one loading layer and clear message/progress for overlay reset.
   */
  const hideLoading = useCallback(() => {
    setLoadingCount((count) => Math.max(0, count - 1));
    setMessage(undefined);
    setProgress(undefined);
  }, []);

  /**
   * Explicitly control loading visibility for external workflows.
   */
  const setLoading = useCallback(
    (value: boolean, nextMessage?: string) => {
      setExternalLoadingState(value);
      if (value) {
        setMessage(nextMessage);
      } else if (loadingCount === 0) {
        setMessage(undefined);
        setProgress(undefined);
      }
    },
    [loadingCount],
  );

  /**
   * Wrap an async function with automatic loading start/stop handling.
   */
  const withLoading = useCallback(
    async <T,>(asyncFunction: () => Promise<T>, nextMessage?: string): Promise<T> => {
      showLoading(nextMessage);
      try {
        return await asyncFunction();
      } finally {
        hideLoading();
      }
    },
    [showLoading, hideLoading],
  );

  /**
   * Wrap an async function with loading state and determinate progress updates.
   */
  const withProgressLoading = useCallback(
    async <T,>(
      asyncFunction: (setProgress: (progress: number, nextMessage?: string) => void) => Promise<T>,
      nextMessage?: string,
    ): Promise<T> => {
      showLoading(nextMessage);
      setProgress(0);

      const updateProgress = (nextProgress: number, progressMessage?: string) => {
        const safeProgress = Math.max(0, Math.min(100, Math.round(nextProgress)));
        setProgress(safeProgress);

        const messagePrefix = progressMessage ?? nextMessage;
        if (messagePrefix) {
          setMessage(`${messagePrefix} (${safeProgress}%)`);
        } else {
          setMessage(`Loading (${safeProgress}%)`);
        }
      };

      try {
        return await asyncFunction(updateProgress);
      } finally {
        hideLoading();
      }
    },
    [showLoading, hideLoading],
  );

  const value = useMemo(
    () => ({
      isLoading,
      message,
      progress,
      showLoading,
      hideLoading,
      setLoading,
      withLoading,
      withProgressLoading,
      setMessage,
    }),
    [
      isLoading,
      message,
      progress,
      showLoading,
      hideLoading,
      setLoading,
      withLoading,
      withProgressLoading,
      setMessage,
    ],
  );

  return (
    <LoadingContext.Provider value={value}>
      {children}
      <Suspense fallback={null}>
        <LoadingOverlay />
      </Suspense>
    </LoadingContext.Provider>
  );
};

export default LoadingProvider;
