export const IsNullOrEmpty = (str: string | null | undefined): str is '' | null | undefined => {
  return str === null || str === undefined || str.trim() === '';
};

export const Capitalize = (str: string): string => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};
