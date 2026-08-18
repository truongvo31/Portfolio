import { useTranslation } from 'react-i18next';
import CPlusPlusIcon from '../../../../assets/icons/cplusplus';
import CSharpIcon from '../../../../assets/icons/csharp';
import DelphiIcon from '../../../../assets/icons/delphi';
import PythonIcon from '../../../../assets/icons/python';
import TypeScriptIcon from '../../../../assets/icons/typescript';
import VisualBasicIcon from '../../../../assets/icons/visualBasic';
import type { SkillGridProps } from './skillGrid';
import SkillGrid from './skillGrid';

const ProgrammingTab = () => {
  const { t } = useTranslation();

  const languages: SkillGridProps[] = [
    {
      id: 'csharp',
      name: t('client.home.skills.programming.items.csharp.name'),
      level: 100,
      icon: <CSharpIcon size="2rem" />,
    },
    {
      id: 'typescript',
      name: t('client.home.skills.programming.items.typescript.name'),
      level: 100,
      icon: <TypeScriptIcon size="2rem" />,
    },
    {
      id: 'cplusplus',
      name: t('client.home.skills.programming.items.cplusplus.name'),
      level: 75,
      icon: <CPlusPlusIcon size="2rem" />,
    },
    {
      id: 'visualbasic',
      name: t('client.home.skills.programming.items.visualbasic.name'),
      level: 75,
      icon: <VisualBasicIcon size="2rem" />,
    },
    {
      id: 'delphi',
      name: t('client.home.skills.programming.items.delphi.name'),
      level: 75,
      icon: <DelphiIcon size="2rem" />,
    },
    {
      id: 'python',
      name: t('client.home.skills.programming.items.python.name'),
      level: 25,
      icon: <PythonIcon size="2rem" />,
    },
  ];

  return <SkillGrid skills={languages} />;
};

export default ProgrammingTab;
