import { useTranslation } from 'react-i18next';
import AmericaIcon from '../../../../assets/icons/america';
import JapanIcon from '../../../../assets/icons/japan';
import VietnamIcon from '../../../../assets/icons/vietnam';
import type { SkillGridProps } from './skillGrid';
import SkillGrid from './skillGrid';

const LanguagesTab = () => {
  const { t } = useTranslation();

  const languages: SkillGridProps[] = [
    {
      id: 'vietnamese',
      name: t('client.home.skills.languages.items.vietnamese'),
      icon: <VietnamIcon size="2rem" />,
      level: 100,
    },
    {
      id: 'english',
      name: t('client.home.skills.languages.items.english'),
      icon: <AmericaIcon size="2rem" />,
      level: 75,
    },
    {
      id: 'japanese',
      name: t('client.home.skills.languages.items.japanese'),
      icon: <JapanIcon size="2rem" />,
      level: 50,
    },
  ];

  return <SkillGrid skills={languages} />;
};

export default LanguagesTab;
