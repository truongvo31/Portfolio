export type LoadingContextValue = {
  /**
   * Whether any loading workflow is currently active.
   */
  isLoading: boolean;

  /**
   * Current loading message shown in the overlay.
   */
  message?: string;

  /**
   * Current loading progress value in percentage, from 0 to 100.
   * Undefined means the loading state is indeterminate.
   */
  progress?: number;

  /**
   * Set or clear the loading message.
   *
   * @param message Optional message displayed in the loading overlay.
   */
  setMessage: (message?: string) => void;

  /**
   * Enter loading state and optionally set the loading message.
   *
   * @param message Optional message displayed in the loading overlay.
   */
  showLoading: (message?: string) => void;

  /**
   * Exit loading state and clear transient loading data.
   */
  hideLoading: () => void;

  /**
   * Force loading state on/off for externally managed flows.
   *
   * @param value True to show loading, false to hide loading.
   * @param message Optional message used when loading is enabled.
   */
  setLoading: (value: boolean, message?: string) => void;

  /**
   * Run an async task inside a loading lifecycle.
   * Loading is shown before execution and hidden in a finally block.
   *
   * @param asyncFunction Async callback to execute.
   * @param message Optional loading message displayed while running.
   * @returns The async callback result.
   */
  withLoading: <T>(asyncFunction: () => Promise<T>, message?: string) => Promise<T>;

  /**
   * Run an async task with loading and progress updates.
   *
   * The provided setProgress callback accepts percentage values and an
   * optional message. Progress is expected in the 0..100 range.
   *
   * @param asyncFunction Async callback that receives the progress updater.
   * @param message Optional base loading message.
   * @returns The async callback result.
   *
   * @example
   * await withProgressLoading(async (setProgress) => {
   *       const maxIterations = 1000;
   *       for (let i = 0; i <= maxIterations; i++) {
   *         const progress = Math.min(100, (i / maxIterations) * 100);
   *         setProgress(progress, `Loading... ${progress.toFixed(1)}%`);
   *         await new Promise((resolve) => setTimeout(resolve, 100));
   *       }
   *     }, 'Loading');
   */
  withProgressLoading: <T>(
    asyncFunction: (setProgress: (progress: number, message?: string) => void) => Promise<T>,
    message?: string,
  ) => Promise<T>;
};
