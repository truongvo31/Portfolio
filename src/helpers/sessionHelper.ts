import api from './apiHelper';

const SESSION_QUERY_KEY = 'session';

export const getSessionToken = (searchParams: URLSearchParams): string | null => {
  return searchParams.get(SESSION_QUERY_KEY);
};

export const validateSessionToken = async (_sessionToken: string): Promise<boolean> => {
  void _sessionToken;
  const { data, error, message } = await api.$get<boolean>(
    `client/validate-session/${_sessionToken}`,
  );
  if (error) throw new Error(message);
  return data;
};
