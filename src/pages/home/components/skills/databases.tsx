import { useTranslation } from 'react-i18next';
import OracleIcon from '../../../../assets/icons/oracle';
import PostgresIcon from '../../../../assets/icons/postgres';
import SQLiteIcon from '../../../../assets/icons/sqlite';
import SqlServerIcon from '../../../../assets/icons/sqlserver';
import type { SkillGridProps } from './skillGrid';
import SkillGrid from './skillGrid';

const DatabasesTab = () => {
  const { t } = useTranslation();

  const databases: SkillGridProps[] = [
    {
      id: 'postgres',
      name: t('client.home.skills.databases.items.postgres'),
      icon: <PostgresIcon size="2rem" />,
      level: 75,
    },
    {
      id: 'oracle',
      name: t('client.home.skills.databases.items.oracle'),
      icon: <OracleIcon size="2rem" />,
      level: 75,
    },
    {
      id: 'sqlite',
      name: t('client.home.skills.databases.items.sqlite'),
      icon: <SQLiteIcon size="2rem" />,
      level: 75,
    },
    {
      id: 'sqlserver',
      name: t('client.home.skills.databases.items.sqlserver'),
      icon: <SqlServerIcon size="2rem" />,
      level: 50,
    },
  ];

  return <SkillGrid skills={databases} />;
};

export default DatabasesTab;
