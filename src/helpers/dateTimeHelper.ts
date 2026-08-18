export const utcToLocalTime = (utcDate: string): string => {
  if (!utcDate) return '';
  // Do not add 'Z' here, as C# must define the date as UTC in the backend. Data consistency is important.
  const date = new Date(utcDate);
  return date.toLocaleString();
};

export const isPastUtcDate = (utcDate: string): boolean => {
  if (!utcDate) return false;
  const now = new Date();
  const date = new Date(utcDate);
  return date < now;
};
