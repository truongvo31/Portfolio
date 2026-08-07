import type { Slot } from '@fluentui/react-components';

export type NavItem = {
  name: string;
  label: string;
  icon: Slot<'span'>;
  path?: string;
  subItems?: Omit<NavItem, 'icon'>[];
};
