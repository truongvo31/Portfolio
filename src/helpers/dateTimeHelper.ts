export const utcToLocalTime = (utcDate: string): string => {
  const date = new Date(utcDate + 'Z'); // Append 'Z' to indicate UTC time
  return date.toLocaleString();
};

export const isPastUtcDate = (utcDate: string): boolean => {
  const now = new Date();
  const date = new Date(utcDate + 'Z'); // Append 'Z' to indicate UTC time
  return date < now;
};
