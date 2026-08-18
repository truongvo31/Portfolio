export type TocItem = {
  id: string;
  label: string;
  children?: TocItem[];
};
