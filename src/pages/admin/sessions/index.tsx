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
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const { setLoading } = useLoading();
  const { $get, $delete } = useApi();
  const { $error, $confirm, $info } = useMessages();
  const { $success } = useToaster();
  const { md } = useBreakpoints();
  const { prompt } = useDialog();

  const { isLoading, data, refetch } = useQuery({
    queryKey: ['sessions'],
    queryFn: async () => {
      try {
        const { data, error, message } = await $get<Session[]>('admin/get-sessions');
        if (error) throw new Error(message || t('admin.page.sessions.messages.fetchFailed'));
        return data;
      } catch (error) {
        $error(t('admin.page.sessions.messages.fetchFailed'), (error as Error).message);
      }
    },
  });

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  const columns: SessionTableColumn[] = [
    {
      key: 'no',
      label: t('admin.page.sessions.table.columns.no'),
      width: '56px',
    },
    {
      key: 'id',
      label: t('admin.page.sessions.table.columns.id'),
    },
    {
      key: 'isRevoked',
      label: t('admin.page.sessions.table.columns.revoked'),
      width: '92px',
    },
  ];

  if (md) {
    columns.push({
      key: 'expiresAtUtc',
      label: t('admin.page.sessions.table.columns.expiresAt'),
      width: '190px',
    });
  }

  columns.push({
    key: 'actions',
    label: t('admin.page.sessions.table.columns.actions'),
    width: '100px',
  });

  const handleCreateSession = async () => {
    const res = await prompt({
      content: <UpsertDialog />,
    });
    if (res) {
      $success(t('admin.page.sessions.messages.updateSuccess'));
      refetch();
    }
  };

  const handleDeleteSessions = async () => {
    try {
      const consent = await $confirm(
        t('admin.page.sessions.messages.deleteTitle'),
        t('admin.page.sessions.messages.deleteBody'),
      );
      if (!consent) {
        return;
      }
      const sessionsToBeDeleted = data?.filter(
        (session) => session.isRevoked || isPastUtcDate(session.expiresAtUtc),
      );
      if (!sessionsToBeDeleted || sessionsToBeDeleted.length === 0) {
        $info(
          t('admin.page.sessions.messages.deleteEmptyTitle'),
          t('admin.page.sessions.messages.deleteEmptyBody'),
        );
        return;
      }
      setLoading(true);
      const { error, message } = await $delete('admin/empty-sessions');
      if (error) throw new Error(message || t('admin.page.sessions.messages.deleteFailed'));
      $success(t('admin.page.sessions.messages.deleteSuccess'));
      refetch();
    } catch (error) {
      $error(t('admin.page.sessions.messages.deleteFailed'), (error as Error).message);
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
      $success(t('admin.page.sessions.messages.updateSuccess'));
      refetch();
    }
  };

  const handleGenerateUrl = async (id: string): Promise<void> => {
    const model = data?.find((session) => session.id === id);
    if (!model) {
      $error(
        t('admin.page.sessions.messages.sessionNotFoundTitle'),
        t('admin.page.sessions.messages.sessionNotFoundBody', { id }),
      );
      return;
    }
    if (model.isRevoked || isPastUtcDate(model.expiresAtUtc)) {
      $error(
        t('admin.page.sessions.messages.invalidTitle'),
        t('admin.page.sessions.messages.invalidBody'),
      );
      return;
    }
    const url = new URL(import.meta.env.BASE_URL, location.origin);
    url.searchParams.set('session', id);
    await navigator.clipboard.writeText(url.toString());
    $success(t('admin.page.sessions.messages.clipboardSuccess'));
  };

  return (
    <div className="flex flex-col gap-4 container">
      <PageHeader
        pageTitle={t('admin.page.sessions.pageTitle')}
        description={t('admin.page.sessions.description')}
      >
        <Button appearance="primary" icon={<Add24Regular />} onClick={handleCreateSession}>
          {t('admin.page.sessions.actions.createSession')}
        </Button>
        <Button appearance="secondary" icon={<Delete24Regular />} onClick={handleDeleteSessions}>
          {t('admin.page.sessions.actions.deleteSessions')}
        </Button>
      </PageHeader>
      <div className="px-4 md:px-6">
        <div className="overflow-x-auto">
          <Table
            aria-label={t('admin.page.sessions.table.ariaLabel')}
            className="w-full table-fixed"
          >
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
                  <TableCell>
                    {session.isRevoked
                      ? t('admin.page.sessions.table.values.yes')
                      : t('admin.page.sessions.table.values.no')}
                  </TableCell>
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
