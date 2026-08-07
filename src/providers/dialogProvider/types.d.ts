import type { ComponentType, ReactElement } from 'react';

/**
 * Renderable payload accepted by the async dialog system.
 *
 * - Pass a JSX element when you want to provide props directly.
 * - Pass a component type when no props are required.
 *
 * The component itself owns the entire dialog UI, including `Dialog`,
 * `DialogSurface`, actions, and dismiss behavior.
 */
export type AsyncDialogRenderable = ComponentType | ReactElement;

/**
 * Options for opening a new async dialog request.
 */
export type AsyncDialogPromptOptions = {
  /**
   * Fully customized dialog content.
   *
   * This should usually be a JSX element so that all required props are
   * captured at call time.
   */
  content: AsyncDialogRenderable;
};

/**
 * Public async dialog API exposed through context and `useAsyncDialog`.
 */
export type AsyncDialogContextValue = {
  /**
   * Enqueue and show a dialog request.
   *
   * Requests are processed FIFO (first-in, first-out). The returned promise
   * resolves when the active dialog calls `resolve` or `cancel`.
   *
   * @typeParam T Value returned when `resolve(value)` is called.
   * @param options Prompt options containing the custom content.
   * @returns Promise that resolves with `T` or `undefined` when canceled.
   */
  prompt: <T>(options: AsyncDialogPromptOptions) => Promise<T | undefined>;

  /**
   * Current visibility state of the active prompt.
   *
   * Custom dialog components should bind this to their dialog `open` prop so
   * close animations can run before the provider dequeues content.
   */
  isOpen: boolean;

  /**
   * Resolve the current dialog with a typed value.
   *
   * Calling this completes the current prompt promise and advances the queue.
   *
   * @typeParam T Value type returned to the caller awaiting `prompt`.
   * @param value Result value for the current prompt.
   */
  resolve: <T>(value: T) => Promise<void>;

  /**
   * Cancel the current dialog.
   *
   * This resolves the current prompt as `undefined` and advances the queue.
   */
  cancel: () => Promise<void>;
};
