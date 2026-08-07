/* eslint-disable @typescript-eslint/no-explicit-any */
type GetConfig = {
  params?: Record<string, any>;
  headers?: Record<string, string>;
};

type ApiResponse<T> =
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

const joinURL = (base: string, path: string) => {
  const b = base.replace(/\/+$/, '');
  const p = path.replace(/^\/+/, '');
  return `${b}/${p}`;
};

const safeParseJSON = async (response: Response) => {
  try {
    return await response.json();
  } catch {
    return null;
  }
};

const request = async <T>(
  url: string,
  options: RequestInit = {},
  timeout: number,
): Promise<ApiResponse<T>> => {
  try {
    let baseURL = import.meta.env.VITE_API_URL as string | undefined;
    // let baseURL = 'https://pokedex-backend-bjdzgedpagcrhrb7.japanwest-01.azurewebsites.net/api';
    if (!baseURL) {
      throw new Error('VITE_API_URL is not defined in the environment variables');
    }
    baseURL = baseURL.trim();
    if (!/(^|\/)api\/?([?#].*)?$/i.test(baseURL)) {
      baseURL = baseURL.replace(/\/+$/, '') + '/api';
    }
    const fullURL = joinURL(baseURL, url);
    const controller = new AbortController();
    const _timeout = timeout >= 1000 ? setTimeout(() => controller.abort(), timeout) : undefined;
    const response = await fetch(fullURL, {
      ...options,
      headers: {
        ...(options.body ? { 'Content-Type': 'application/json' } : {}),
        ...(options.headers || {}),
        ...(import.meta.env.VITE_DEV_ACCESS_KEY
          ? { 'X-Dev-Access-Key': import.meta.env.VITE_DEV_ACCESS_KEY as string }
          : {}),
      },
      body:
        options.body && typeof options.body === 'object'
          ? JSON.stringify(options.body)
          : options.body,
      credentials: 'include',
    });
    clearTimeout(_timeout);

    if (!response.ok) {
      const errorData = await safeParseJSON(response);
      throw {
        status: response.status,
        statusMessage: response.statusText,
        data: errorData,
      };
    }

    const data = (await response.json()) as T;

    return {
      error: false,
      status: response.status,
      message: '',
      data,
    };
  } catch (err: any) {
    console.error('API request error:', err);

    if (err.name === 'AbortError') {
      return {
        error: true,
        status: 408,
        message: 'Request timeout',
        data: undefined,
      };
    }

    const status = err?.status || 500;
    const message =
      err?.data?.message || err?.statusMessage || err?.message || 'Unexpected error occurred';

    return {
      error: true,
      status,
      message,
      data: undefined,
    };
  }
};

const $get = <T>(url: string, config: GetConfig = {}, timeout = 0) => {
  const query = config.params ? '?' + new URLSearchParams(config.params).toString() : '';
  return request<T>(url + query, { method: 'GET', headers: config.headers }, timeout);
};

const $post = <T>(url: string, body?: any, timeout = 0) =>
  request<T>(
    url,
    {
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    },
    timeout,
  );

const $delete = <T>(url: string, config: GetConfig = {}, timeout = 0) => {
  const query = config.params ? '?' + new URLSearchParams(config.params).toString() : '';
  return request<T>(
    url + query,
    {
      method: 'DELETE',
      headers: config.headers,
    },
    timeout,
  );
};

export default {
  $get,
  $post,
  $delete,
};
