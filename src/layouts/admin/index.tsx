import { useMsal } from '@azure/msal-react';
import { Button, makeStyles, Text, tokens } from '@fluentui/react-components';
import { Navigation24Regular, SignOut24Regular } from '@fluentui/react-icons';
import { Outlet } from 'react-router-dom';
import SidebarProvider from '../../providers/sidebarProvider';
import useSidebar from '../../stores/useSidebar';
import AppSidebar from './components/appSidebar';

const useFluentStyles = makeStyles({
  nav: {
    backgroundColor: 'transparent',
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
});

const LayoutContent = () => {
  const fluentStyles = useFluentStyles();
  const { toggleMobileSidebar, isMobile, toggleSidebar } = useSidebar();
  const { instance } = useMsal();

  return (
    <div className="flex flex-col h-dvh">
      <nav
        className={
          'h-(--header-height) flex gap-2 px-4 items-center justify-between ' + fluentStyles.nav
        }
      >
        <div className="flex items-center gap-2">
          <Button
            onClick={isMobile ? toggleMobileSidebar : toggleSidebar}
            icon={<Navigation24Regular />}
            appearance="transparent"
          />
          <Text weight="semibold" size={400}>
            Portfolio Admin
          </Text>
        </div>
        <div className="flex items-center gap-2">
          <Button
            icon={<SignOut24Regular />}
            appearance="transparent"
            onClick={() => instance.logoutRedirect()}
          />
        </div>
      </nav>
      <main className="flex h-[calc(100dvh-var(--header-height))]">
        <AppSidebar />
        <div className="flex-1 min-w-0 overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

const AdminLayout = () => {
  return (
    <SidebarProvider>
      <LayoutContent />
    </SidebarProvider>
  );
};

export default AdminLayout;
