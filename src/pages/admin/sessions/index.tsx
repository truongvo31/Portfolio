import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
  Text,
} from '@fluentui/react-components';
import { Add24Regular, Copy24Regular, Delete24Regular, Edit24Regular } from '@fluentui/react-icons';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import PageHeader from '../../../components/pageHeader';
import { isPastUtcDate, utcToLocalTime } from '../../../helpers/dateTimeHelper';
import useApi from '../../../stores/useApi';
import { useBreakpoints } from '../../../stores/useBreakpoints';
import useDialog from '../../../stores/useDialog';
import useLoading from '../../../stores/useLoading';
import useMessages from '../../../stores/useMessages';
import useToaster from '../../../stores/useToaster';
import UpsertDialog from './components/upsertDialog';
import type { Session } from './types';

type SessionTableColumn = {
  key: 'no' | 'id' | 'isRevoked' | 'expiresAtUtc' | 'actions';
  label: string;
  width?: string;
};

const AdminSessionPage = () => {
  const { setLoading } = useLoading();
  const { $get, $delete } = useApi();
  const { $error } = useMessages();
  const { $success } = useToaster();
  const { md } = useBreakpoints();
  const { prompt } = useDialog();

  const { isLoading, data, refetch } = useQuery({
    queryKey: ['sessions'],
    queryFn: async () => {
      try {
        const { data, error, message } = await $get<Session[]>('admin/get-sessions');
        if (error) throw new Error(message || 'Failed to fetch sessions');
        return data;
      } catch (error) {
        $error('Failed to fetch sessions', (error as Error).message);
      }
    },
  });

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  const columns: SessionTableColumn[] = [
    {
      key: 'no',
      label: 'No.',
      width: '56px',
    },
    {
      key: 'id',
      label: 'Session ID',
    },
    {
      key: 'isRevoked',
      label: 'Revoked',
      width: '92px',
    },
  ];

  if (md) {
    columns.push({
      key: 'expiresAtUtc',
      label: 'Expires At',
      width: '190px',
    });
  }

  columns.push({
    key: 'actions',
    label: 'Actions',
    width: '100px',
  });

  const handleCreateSession = async () => {
    const res = await prompt({
      content: <UpsertDialog />,
    });
    if (res) {
      $success('Session updated successfully');
      refetch();
    }
  };

  const handleDeleteSessions = async () => {
    try {
      setLoading(true);
      const { error, message } = await $delete('admin/empty-sessions');
      if (error) throw new Error(message || 'Failed to delete sessions');
      $success('Sessions deleted successfully');
      refetch();
    } catch (error) {
      $error('Failed to delete sessions', (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditSession = async (id: string) => {
    const model = data?.find((session) => session.id === id);
    const res = await prompt({
      content: <UpsertDialog model={model} />,
    });
    if (res) {
      $success('Session updated successfully');
      refetch();
    }
  };

  const handleGenerateUrl = async (id: string): Promise<void> => {
    const model = data?.find((session) => session.id === id);
    if (!model) {
      $error('Session not found', `No session found with ID: ${id}`);
      return;
    }
    if (model.isRevoked || isPastUtcDate(model.expiresAtUtc)) {
      $error('Session is invalid', 'The session is either revoked or expired.');
      return;
    }
    const url = new URL(import.meta.env.BASE_URL, location.origin);
    url.searchParams.set('session', id);
    await navigator.clipboard.writeText(url.toString());
    $success('Session URL copied to clipboard');
  };

  return (
    <div className="flex flex-col gap-4 container">
      <PageHeader pageTitle="Sessions" description="Manage all sessions">
        <Button appearance="primary" icon={<Add24Regular />} onClick={handleCreateSession}>
          Create Session
        </Button>
        <Button appearance="secondary" icon={<Delete24Regular />} onClick={handleDeleteSessions}>
          Delete Sessions
        </Button>
      </PageHeader>
      <div className="px-4 md:px-6">
        <div className="overflow-x-auto">
          <Table aria-label="Sessions Table" className="w-full table-fixed">
            <TableHeader>
              <TableRow>
                {columns.map((column) => (
                  <TableHeaderCell
                    key={column.key}
                    style={{
                      width: column.width,
                    }}
                  >
                    {column.label}
                  </TableHeaderCell>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.map((session, index) => (
                <TableRow key={session.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="overflow-hidden text-ellipsis whitespace-nowrap">
                    <Text wrap={false}>{session.id}</Text>
                  </TableCell>
                  <TableCell>{session.isRevoked ? 'Yes' : 'No'}</TableCell>
                  {md && <TableCell>{utcToLocalTime(session.expiresAtUtc)}</TableCell>}
                  <TableCell className="justify-center whitespace-nowrap">
                    <Button
                      appearance="subtle"
                      icon={<Edit24Regular />}
                      onClick={() => handleEditSession(session.id)}
                    />
                    <Button
                      appearance="subtle"
                      icon={<Copy24Regular />}
                      onClick={() => handleGenerateUrl(session.id)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default AdminSessionPage;
