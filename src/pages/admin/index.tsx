import { Navigate } from 'react-router-dom';

const AdminPage = () => {
  return <Navigate to="/admin/sessions" replace={true} />;
};

export default AdminPage;
