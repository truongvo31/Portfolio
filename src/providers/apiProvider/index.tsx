import { InteractionRequiredAuthError } from '@azure/msal-browser';
import { useMsal } from '@azure/msal-react';
import { useCallback, useMemo } from 'react';
import { msalScopes } from '../../msalConfig';
import ApiContext from './context';
import type { ApiContextValue, ApiResponse, GetConfig } from './types';

type RequestOptions = Omit<RequestInit, 'body'> & {
  body?: unknown;
};

const PROTECTED_ENDPOINT_PREFIXES = ['admin'] as const;

const createQueryString = (params?: GetConfig['params']): string => {
  if (!params) {
    return '';
  }

  const entries = Object.entries(params)
    .filter(([, value]) => value !== null && value !== undefined)
    .map(([key, value]) => [key, String(value)]);

  return entries.length > 0 ? `?${new URLSearchParams(entries).toString()}` : '';
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

const normalizeEndpointPath = (url: string) => url.replace(/^\/+/, '').split(/[?#]/, 1)[0] ?? '';

const isProtectedEndpoint = (url: string) => {
  const normalizedPath = normalizeEndpointPath(url);

  return PROTECTED_ENDPOINT_PREFIXES.some(
    (prefix) => normalizedPath === prefix || normalizedPath.startsWith(`${prefix}/`),
  );
};

const ApiProvider = ({ children }: { children: React.ReactNode }) => {
  const { accounts, instance } = useMsal();

  const getAuthorizationHeader = useCallback(
    async (url: string) => {
      if (!isProtectedEndpoint(url)) {
        return null;
      }

      const account = accounts[0] ?? instance.getActiveAccount();

      if (!account) {
        return null;
      }

      try {
        const response = await instance.acquireTokenSilent({
          scopes: msalScopes,
          account,
        });

        return `Bearer ${response.accessToken}`;
      } catch (error) {
        if (error instanceof InteractionRequiredAuthError) {
          return null;
        }

        throw error;
      }
    },
    [accounts, instance],
  );

  const request = useCallback(
    async <T,>(url: string, options: RequestOptions = {}, timeout = 0): Promise<ApiResponse<T>> => {
      try {
        let baseURL = import.meta.env.VITE_API_URL as string | undefined;
        if (!baseURL) {
          throw new Error('VITE_API_URL is not defined in the environment variables');
        }

        baseURL = baseURL.trim();
        if (!/(^|\/)api\/?([?#].*)?$/i.test(baseURL)) {
          baseURL = `${baseURL.replace(/\/+$/, '')}/api`;
        }

        const fullURL = joinURL(baseURL, url);
        const authorizationHeader = await getAuthorizationHeader(url);

        if (isProtectedEndpoint(url) && !authorizationHeader) {
          return {
            error: true,
            status: 401,
            message: 'Authentication required',
            data: undefined,
          };
        }

        const controller = new AbortController();
        const timeoutId =
          timeout >= 1000 ? setTimeout(() => controller.abort(), timeout) : undefined;
        const serializedBody: BodyInit | undefined =
          options.body && typeof options.body === 'object'
            ? JSON.stringify(options.body)
            : (options.body as BodyInit | undefined);

        const response = await fetch(fullURL, {
          ...options,
          headers: {
            ...(options.body ? { 'Content-Type': 'application/json' } : {}),
            ...(authorizationHeader ? { Authorization: authorizationHeader } : {}),
            ...(options.headers || {}),
            ...(import.meta.env.VITE_DEV_ACCESS_KEY
              ? { 'X-Dev-Access-Key': import.meta.env.VITE_DEV_ACCESS_KEY as string }
              : {}),
          },
          body: serializedBody,
          credentials: 'include',
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

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
      } catch (err: unknown) {
        console.error('API request error:', err);

        const apiError = err as {
          name?: string;
          status?: number;
          statusMessage?: string;
          message?: string;
          data?: { message?: string };
        };

        if (apiError.name === 'AbortError') {
          return {
            error: true,
            status: 408,
            message: 'Request timeout',
            data: undefined,
          };
        }

        const status = apiError.status || 500;
        const message =
          apiError.data?.message ||
          apiError.statusMessage ||
          apiError.message ||
          'Unexpected error occurred';

        return {
          error: true,
          status,
          message,
          data: undefined,
        };
      }
    },
    [getAuthorizationHeader],
  );

  const $get = useCallback(
    <T,>(url: string, config: GetConfig = {}, timeout = 0) => {
      const query = createQueryString(config.params);
      return request<T>(url + query, { method: 'GET', headers: config.headers }, timeout);
    },
    [request],
  );

  const $post = useCallback(
    <T,>(url: string, body?: unknown, timeout = 0) =>
      request<T>(
        url,
        {
          method: 'POST',
          body: body ?? undefined,
        },
        timeout,
      ),
    [request],
  );

  const $delete = useCallback(
    <T,>(url: string, config: GetConfig = {}, timeout = 0) => {
      const query = createQueryString(config.params);
      return request<T>(
        url + query,
        {
          method: 'DELETE',
          headers: config.headers,
        },
        timeout,
      );
    },
    [request],
  );

  const value = useMemo<ApiContextValue>(
    () => ({
      $get,
      $post,
      $delete,
    }),
    [$get, $post, $delete],
  );

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};

export default ApiProvider;
