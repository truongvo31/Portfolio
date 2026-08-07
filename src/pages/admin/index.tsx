import { Button } from '@fluentui/react-components';
import useApi from '../../stores/useApi';

const AdminPage = () => {
  const { $get } = useApi();

  const handleCreateSession = async () => {
    try {
      const { data } = await $get<string>('admin/create-session');
      console.log('Session created:', data);
    } catch (error) {
      console.error('Error creating session:', error);
    }
  };

  return (
    <div className="container flex flex-col">
      <h1 className="text-2xl font-bold">Admin Page</h1>
      <Button appearance="primary" onClick={handleCreateSession} className="w-fit">
        Create Session
      </Button>
    </div>
  );
};

export default AdminPage;
