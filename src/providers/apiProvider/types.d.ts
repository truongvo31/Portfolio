export type GetConfig = {
  params?: Record<string, string | number | boolean | null | undefined>;
  headers?: Record<string, string>;
};

export type ApiResponse<T> =
  | {
      error: false;
      status: number;
      message: '';
      data: T;
    }
  | {
      error: true;
      status: number;
      message: string;
      data: undefined;
    };

export type SetHeaderInput =
  | Record<string, string | null | undefined>
  | {
      key: string;
      value?: string | null;
    };

export type ApiContextValue = {
  $get: <T>(url: string, config?: GetConfig, timeout?: number) => Promise<ApiResponse<T>>;
  $post: <T>(url: string, body?: unknown, timeout?: number) => Promise<ApiResponse<T>>;
  $delete: <T>(url: string, config?: GetConfig, timeout?: number) => Promise<ApiResponse<T>>;
  setHeader: (
    keyOrHeaders: string | Record<string, string | null | undefined>,
    value?: string | null,
  ) => void;
};
