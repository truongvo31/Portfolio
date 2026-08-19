import { useTranslation } from 'react-i18next';
import type { Tab } from '../../../../components/overflowTabList';
import OverflowTabs from '../../../../components/overflowTabList';
import ProjectDescription from './projectDescription';

interface ProjectsProps {
  id: string;
  selectedTabId: string | undefined;
  onTabSelected: (tabId: string) => void;
}

const Projects = ({ id, selectedTabId, onTabSelected }: ProjectsProps) => {
  const { t } = useTranslation();

  const tabs: Tab[] = [
    {
      id: 'portfolio',
      name: t('client.home.tableOfContents.projects.portfolio'),
      content: <ProjectDescription className="flex flex-col gap-1" projectId="portfolio" />,
    },
    {
      id: 'pokedex',
      name: t('client.home.tableOfContents.projects.pokedex'),
      content: <ProjectDescription className="custom-class" projectId="pokedex" />,
    },
  ];

  return (
    // <div id={id}>
    //   {projects.map((project) => (
    //     <div key={project.id} id={project.id}>
    //       <h3>{project.title}</h3>
    //       <ProjectDescription projectId={project.id} />
    //     </div>
    //   ))}
    // </div>
    <div id={id} className="pt-2 pb-4">
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

export default Projects;
