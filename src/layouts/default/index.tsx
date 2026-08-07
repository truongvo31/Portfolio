import ReactIcon from '@/assets/react.svg';
import { Tab, TabList, Text } from '@fluentui/react-components';
import {
  Home24Filled,
  Home24Regular,
  Settings24Filled,
  Settings24Regular,
  bundleIcon,
} from '@fluentui/react-icons';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useBreakpoints } from '../../stores/useBreakpoints';
import type { NavItem } from './types';

const HomeIcon = bundleIcon(Home24Filled, Home24Regular);
// const ResumeIcon = bundleIcon(Person24Filled, Person24Regular);

const getBasePath = (pathname: string): string => {
  const segments = pathname.split('/').filter(Boolean);
  return (segments.length > 0 ? `/${segments[0]}` : '/').toLowerCase();
};

const SettingsIcon = bundleIcon(Settings24Filled, Settings24Regular);

const DefaultLayout = () => {
  const { t } = useTranslation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { md } = useBreakpoints();

  const navItems: NavItem[] = [
    {
      name: 'home',
      label: t('app.home'),
      path: '/',
      icon: <HomeIcon />,
    },
    // {
    //   name: 'resume',
    //   label: t('app.resume'),
    //   path: '/resume',
    //   icon: <ResumeIcon />,
    // },
  ];

  const location = useLocation();

  const selectedValue =
    navItems.flat().find((item) => item.path?.toLowerCase() === getBasePath(location.pathname))
      ?.name || getBasePath(location.pathname).substring(1);

  useEffect(() => {
    if (isSidebarOpen) {
      // eslint-disable-next-line
      setIsSidebarOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <div className="h-dvh flex flex-col">
      <header className="flex items-center justify-between container h-(--header-height)">
        <div className="flex gap-2 items-center">
          <img src={ReactIcon} alt="React Logo" className="size-6 hover:animate-spin" />
          <Text as="h1" weight="semibold" size={400}>
            {t('app.title')}
          </Text>
        </div>
        <TabList selectedValue={selectedValue} aria-label="Main navigation">
          {navItems.map((item) => (
            <Link key={item.name} to={item.path || '/'}>
              <Tab value={item.name} icon={item.icon}>
                {md && <div>{item.label}</div>}
              </Tab>
            </Link>
          ))}
          <Link to="/settings">
            <Tab value="settings" icon={<SettingsIcon />}>
              {md && t('app.settings')}
            </Tab>
          </Link>
        </TabList>
      </header>
      <main className="flex-1 min-w-0 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DefaultLayout;
