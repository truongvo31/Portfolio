import {
  Divider,
  makeStyles,
  tokens,
  Tree,
  TreeItem,
  TreeItemLayout,
} from '@fluentui/react-components';
import { AppsListRegular } from '@fluentui/react-icons';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Educations from './components/educations';
import Introduction from './components/introduction';
import Projects from './components/projects';
import Skills from './components/skills';
import WorkHistory from './components/works';
import type { TocItem } from './types';

const useStyles = makeStyles({
  toc: {
    position: 'sticky',
    top: '1rem',
    padding: '1rem',
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusXLarge,
  },
  tocTree: {},
});

const scrollToSection = (id: string) => {
  document.getElementById(id)?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
};

const HomePage = () => {
  const styles = useStyles();
  const { t } = useTranslation();
  const [selectedSkillTab, setSelectedSkillTab] = useState<string | undefined>(undefined);
  const [selectedWorkTab, setSelectedWorkTab] = useState<string | undefined>(undefined);
  const [selectedProjectTab, setSelectedProjectTab] = useState<string | undefined>(undefined);

  const tocItems: TocItem[] = [
    { id: 'introduction', label: t('client.home.tableOfContents.introduction') },
    {
      id: 'skills',
      label: t('client.home.tableOfContents.skills.title'),
      children: [
        { id: 'programming', label: t('client.home.tableOfContents.skills.programming') },
        { id: 'frameworks', label: t('client.home.tableOfContents.skills.frameworks') },
        { id: 'databases', label: t('client.home.tableOfContents.skills.databases') },
        { id: 'languages', label: t('client.home.tableOfContents.skills.languages') },
      ],
    },
    {
      id: 'work',
      label: t('client.home.tableOfContents.workHistory.title'),
      children: [
        {
          id: 'hitachi',
          label: t('client.home.tableOfContents.workHistory.hitachi'),
        },
        {
          id: 'fujitec',
          label: t('client.home.tableOfContents.workHistory.fujitec'),
        },
        {
          id: 'usexpress',
          label: t('client.home.tableOfContents.workHistory.usexpress'),
        },
        {
          id: 'hoangphuc',
          label: t('client.home.tableOfContents.workHistory.hoangphuc'),
        },
      ],
    },
    {
      id: 'education',
      label: t('client.home.tableOfContents.education.title'),
      children: [
        {
          id: 'tdtu',
          label: t('client.home.tableOfContents.education.tdtu'),
        },
        {
          id: 'futaba',
          label: t('client.home.tableOfContents.education.futaba'),
        },
      ],
    },
    {
      id: 'projects',
      label: t('client.home.tableOfContents.projects.title'),
      children: [
        {
          id: 'portfolio',
          label: t('client.home.tableOfContents.projects.portfolio'),
        },
        {
          id: 'pokedex',
          label: t('client.home.tableOfContents.projects.pokedex'),
        },
      ],
    },
  ];

  const handleScrollToChild = (parentId: string, childId: string) => {
    scrollToSection(parentId);
    switch (parentId) {
      case 'skills':
        setSelectedSkillTab(childId);
        break;
      case 'work':
        setSelectedWorkTab(childId);
        break;
      case 'projects':
        setSelectedProjectTab(childId);
        break;
      default:
        break;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] container gap-6 mt-2">
      <div>
        <div className={`hidden md:flex flex-col gap-2 ${styles.toc}`}>
          <h2 className="text-lg font-semibold flex items-center">
            <AppsListRegular className="inline-block mr-2" />
            {t('client.home.tableOfContents.title')}
          </h2>
          <Tree
            aria-label={t('client.home.tableOfContents.ariaLabel')}
            appearance="subtle-alpha"
            className={styles.tocTree}
            defaultOpenItems={tocItems.map((item) => item.id)}
          >
            {tocItems.map((item) => (
              <TreeItem
                key={item.id}
                value={item.id}
                aria-label={item.label}
                itemType={item.children ? 'branch' : 'leaf'}
                onClick={() => scrollToSection(item.id)}
              >
                <TreeItemLayout>{item.label}</TreeItemLayout>
                {item.children && (
                  <Tree>
                    {item.children.map((child) => (
                      <TreeItem
                        key={child.id}
                        value={child.id}
                        aria-label={child.label}
                        itemType="leaf"
                        onClick={() => handleScrollToChild(item.id, child.id)}
                      >
                        <TreeItemLayout>{child.label}</TreeItemLayout>
                      </TreeItem>
                    ))}
                  </Tree>
                )}
              </TreeItem>
            ))}
          </Tree>
        </div>
      </div>
      <div className="flex flex-col gap-2 h-fit">
        <Introduction id="introduction" />

        <Divider alignContent="start" appearance="subtle">
          <p className="text-xl font-semibold">{t('client.home.sections.skills')}</p>
        </Divider>

        <Skills id="skills" selectedTabId={selectedSkillTab} onTabSelected={setSelectedSkillTab} />

        <Divider alignContent="start" appearance="subtle">
          <p className="text-xl font-semibold">{t('client.home.sections.workHistory')}</p>
        </Divider>

        <WorkHistory id="work" selectedTabId={selectedWorkTab} onTabSelected={setSelectedWorkTab} />

        <Divider alignContent="start" appearance="subtle">
          <p className="text-xl font-semibold">{t('client.home.sections.educations')}</p>
        </Divider>

        <Educations id="education" />

        <Divider alignContent="start" appearance="subtle">
          <p className="text-xl font-semibold">{t('client.home.tableOfContents.projects.title')}</p>
        </Divider>

        <Projects
          id="projects"
          selectedTabId={selectedProjectTab}
          onTabSelected={setSelectedProjectTab}
        />
      </div>
    </div>
  );
};

export default HomePage;
