import { Outlet } from 'react-router-dom';
import AdminAuthGuard from '../../components/adminAuthGuard';

const AdminLayout = () => {
  return (
    <AdminAuthGuard>
      <div className="h-dvh flex flex-col">
        <main className="flex-1 min-w-0 overflow-auto">
          <Outlet />
        </main>
      </div>
    </AdminAuthGuard>
  );
};

export default AdminLayout;
