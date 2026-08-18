import {
  Button,
  NavDrawer,
  NavDrawerBody,
  NavDrawerFooter,
  NavDrawerHeader,
  NavItem,
  Text,
  makeStyles,
  tokens,
  type Slot,
} from '@fluentui/react-components';
import {
  Navigation24Regular,
  Settings20Filled,
  Settings20Regular,
  TaskListSquareDatabase24Filled,
  TaskListSquareDatabase24Regular,
  bundleIcon,
} from '@fluentui/react-icons';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import useSidebar from '../../../stores/useSidebar';

type NavItem = {
  name: string;
  label: string;
  icon: Slot<'span'>;
  path?: string;
  subItems?: Omit<NavItem, 'icon'>[];
};

const SessionIcon = bundleIcon(TaskListSquareDatabase24Filled, TaskListSquareDatabase24Regular);
const SettingsIcon = bundleIcon(Settings20Filled, Settings20Regular);

const isMobile = () => window.innerWidth < 768;

const useFluentStyles = makeStyles({
  drawer: {
    backgroundColor: isMobile() ? 'inherit' : 'transparent',
    borderRight: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  drawerFooter: {
    padding: `0 ${tokens.spacingHorizontalXS} 0 ${tokens.spacingHorizontalMNudge}`,
  },
  navItem: {
    backgroundColor: isMobile() ? 'inherit' : 'transparent',
  },
});

const AppSidebar = () => {
  const { isMobile, isExpanded, isMobileOpen, toggleMobileSidebar } = useSidebar();
  const location = useLocation();
  const fluentStyles = useFluentStyles();
  const { t } = useTranslation();

  const navItems: NavItem[][] = [
    // main navigation here
    [
      {
        name: 'Sessions',
        icon: <SessionIcon />,
        path: '/admin/sessions',
        label: t('admin.layout.sidebar.navigation.sessions'),
      },
    ],
    // footer here
    [
      {
        name: 'Settings',
        icon: <SettingsIcon />,
        path: '/admin/settings',
        label: t('settings.title'),
      },
    ],
  ];

  const showNavItemText = isExpanded || isMobile;

  const selectedValue =
    navItems.flat().find((item) => item.path?.toLowerCase() === location.pathname.toLowerCase())
      ?.name || '';

  useEffect(() => {
    if (isMobile && isMobileOpen && location.pathname) {
      toggleMobileSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile, location.pathname]);

  return (
    <NavDrawer
      selectedValue={selectedValue}
      open={isMobile ? isMobileOpen : true}
      type={isMobile ? 'overlay' : 'inline'}
      className={
        (showNavItemText ? 'w-60!' : 'w-14!') +
        ' transition-all duration-300 ease-in-out' +
        fluentStyles.drawer
      }
    >
      {isMobile && (
        <NavDrawerHeader className="h-(--header-height) flex-row! items-center">
          <Button
            onClick={toggleMobileSidebar}
            icon={<Navigation24Regular />}
            appearance="transparent"
          />
          <Text>{t('admin.layout.sidebar.title')}</Text>
        </NavDrawerHeader>
      )}
      <NavDrawerBody className={'py-1! overflow-clip!'}>
        {navItems[0].map((item) => (
          <Link to={item.path || '#'} key={item.name}>
            <NavItem
              icon={item.icon}
              value={item.name}
              className={'p-2.5! text-nowrap ' + fluentStyles.navItem}
            >
              <span
                className={`transition-opacity duration-200 ${
                  showNavItemText ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {item.label}
              </span>
            </NavItem>
          </Link>
        ))}
      </NavDrawerBody>
      <NavDrawerFooter
        className={'py-1! items-center h-(--header-height)' + fluentStyles.drawerFooter}
      >
        {navItems[1].map((item) => (
          <Link to={item.path || '#'} key={item.name} className="w-full!">
            <NavItem
              icon={item.icon}
              value={item.name}
              className={'p-2.5! text-nowrap ' + fluentStyles.navItem}
            >
              <span
                className={`transition-opacity duration-200 ${
                  showNavItemText ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {item.label}
              </span>
            </NavItem>
          </Link>
        ))}
      </NavDrawerFooter>
    </NavDrawer>
  );
};

export default AppSidebar;
