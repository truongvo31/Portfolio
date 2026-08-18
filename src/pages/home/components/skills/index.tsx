import {
  AppFolder24Filled,
  AppFolder24Regular,
  CodeBlock24Filled,
  CodeBlock24Regular,
  Database24Filled,
  Database24Regular,
  LocalLanguage24Filled,
  LocalLanguage24Regular,
  bundleIcon,
} from '@fluentui/react-icons';
import { useTranslation } from 'react-i18next';
import type { Tab } from '../../../../components/overflowTabList';
import OverflowTabs from '../../../../components/overflowTabList';
import DatabasesTab from './databases';
import FrameworksTab from './frameworks';
import LanguagesTab from './languages';
import ProgrammingTab from './programming';

const CodeBlockIcon = bundleIcon(CodeBlock24Filled, CodeBlock24Regular);
const AppFolderIcon = bundleIcon(AppFolder24Filled, AppFolder24Regular);
const DatabaseIcon = bundleIcon(Database24Filled, Database24Regular);
const LocalLanguageIcon = bundleIcon(LocalLanguage24Filled, LocalLanguage24Regular);

type SkillsProps = {
  selectedTabId?: string;
  onTabSelected?: (tabId: string) => void;
};

const Skills = ({ selectedTabId, onTabSelected }: SkillsProps) => {
  const { t } = useTranslation();

  const tabs: Tab[] = [
    {
      id: 'programming',
      name: t('client.home.skills.tabs.programming.name'),
      icon: <CodeBlockIcon />,
      content: <ProgrammingTab />,
    },
    {
      id: 'frameworks',
      name: t('client.home.skills.tabs.frameworks.name'),
      icon: <AppFolderIcon />,
      content: <FrameworksTab />,
    },
    {
      id: 'databases',
      name: t('client.home.skills.tabs.databases.name'),
      icon: <DatabaseIcon />,
      content: <DatabasesTab />,
    },
    {
      id: 'languages',
      name: t('client.home.skills.tabs.languages.name'),
      icon: <LocalLanguageIcon />,
      content: <LanguagesTab />,
    },
  ];

  return (
    <div className="pt-2 pb-4">
      <OverflowTabs
        tabs={tabs}
        orientation="horizontal"
        menuCloseOnScroll={true}
        selectedId={selectedTabId}
        onTabSelected={onTabSelected}
      ></OverflowTabs>
    </div>
  );
};

export default Skills;
