import { useTranslation } from 'react-i18next';
import ArasIcon from '../../../../assets/icons/aras';
import DotNetIcon from '../../../../assets/icons/dotnetcore';
import NuxtIcon from '../../../../assets/icons/nuxt';
import ReactIcon from '../../../../assets/icons/react';
import WinUIIcon from '../../../../assets/icons/winui';
import type { SkillGridProps } from './skillGrid';
import SkillGrid from './skillGrid';

const FrameworksTab = () => {
  const { t } = useTranslation();

  const frameworks: SkillGridProps[] = [
    {
      id: 'dotnet',
      name: t('client.home.skills.frameworks.items.dotnet'),
      level: 100,
      icon: <DotNetIcon size="2rem" />,
    },
    {
      id: 'aras',
      name: t('client.home.skills.frameworks.items.aras'),
      level: 100,
      icon: <ArasIcon color="red" foreground="white" size="2.5rem" />,
    },
    {
      id: 'nuxt',
      name: t('client.home.skills.frameworks.items.nuxt'),
      level: 100,
      icon: <NuxtIcon size="2rem" />,
    },
    {
      id: 'react',
      name: t('client.home.skills.frameworks.items.react'),
      level: 75,
      icon: <ReactIcon size="2rem" />,
    },
    {
      id: 'winui',
      name: t('client.home.skills.frameworks.items.winui'),
      level: 50,
      icon: <WinUIIcon size="2rem" />,
    },
  ];
  return <SkillGrid skills={frameworks} />;
};

export default FrameworksTab;
