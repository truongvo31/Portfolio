import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  CardHeader,
  makeStyles,
  tokens,
  type AccordionToggleEventHandler,
} from '@fluentui/react-components';
import { CheckmarkCircle20Filled, History20Regular } from '@fluentui/react-icons';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import FujitecLogo from '../../../../assets/images/fujitec.png';
import HitachiLogo from '../../../../assets/images/hitachi.webp';
import HoangPhucLogo from '../../../../assets/images/hoangphuc.webp';

interface WorkHistoryProps {
  selectedTabId: string | undefined;
  onTabSelected: (tabId: string) => void;
}

const useStyles = makeStyles({
  present: {
    color: tokens.colorPaletteGreenForeground1,
  },
});

const WorkHistory = ({ selectedTabId, onTabSelected }: WorkHistoryProps) => {
  const { t } = useTranslation();
  const styles = useStyles();

  let works = [
    {
      id: 'hitachi',
      company: t('client.home.workHistory.items.hitachi.company'),
      isCurrent: true,
      position: t('client.home.workHistory.items.hitachi.position'),
      startDate: '2025-10-08',
      description: t('client.home.workHistory.items.hitachi.description'),
      companyUrl: 'https://www.hitachi-hightech.com/global/en/',
      companyLogo: HitachiLogo,
      location: 'japan',
    },
    {
      id: 'fujitec',
      company: t('client.home.workHistory.items.fujitec.company'),
      isCurrent: false,
      position: t('client.home.workHistory.items.fujitec.position'),
      startDate: '2023-08-01',
      endDate: '2025-09-30',
      description: t('client.home.workHistory.items.fujitec.description'),
      companyUrl: 'https://www.fujitec.com/',
      companyLogo: FujitecLogo,
      location: 'japan',
    },
    {
      id: 'usexpress',
      company: t('client.home.workHistory.items.usexpress.company'),
      isCurrent: false,
      position: t('client.home.workHistory.items.usexpress.position'),
      startDate: '2020-08-01',
      endDate: '2020-10-25',
      description: t('client.home.workHistory.items.usexpress.description'),
      companyUrl: undefined,
      location: 'vietnam',
    },
    {
      id: 'hoangphuc',
      company: t('client.home.workHistory.items.hoangphuc.company'),
      isCurrent: false,
      position: t('client.home.workHistory.items.hoangphuc.position'),
      startDate: '2018-06-01',
      endDate: '2020-06-30',
      description: t('client.home.workHistory.items.hoangphuc.description'),
      companyUrl: 'https://hoangphuconline.vn/',
      companyLogo: HoangPhucLogo,
      location: 'vietnam',
    },
  ];

  const handleToggle = useCallback<AccordionToggleEventHandler>(
    (_, data) => {
      onTabSelected(data.value as string);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  // Make sure there is only one current work history item
  const currentWorks = works.filter((work) => work.isCurrent);
  if (currentWorks.length > 1) {
    alert(t('client.home.workHistory.warning.multipleCurrent'));
    works = [currentWorks[0], ...works.filter((work) => !work.isCurrent)];
  }

  // Sort works by start date, with current work history items first
  if (works.filter((work) => work.isCurrent).length === 0) {
    works.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
  } else {
    works.sort((a, b) => {
      if (a.isCurrent && !b.isCurrent) return -1;
      if (!a.isCurrent && b.isCurrent) return 1;
      return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
    });
  }

  return (
    works && (
      <Accordion onToggle={handleToggle} openItems={selectedTabId ? selectedTabId : works[0].id}>
        {works.map((work) => (
          <AccordionItem key={work.id} value={work.id}>
            <AccordionHeader>
              {/* {work.startDate} -{' '}
              {work.endDate ? work.endDate : t('client.home.workHistory.present')} | {work.company}{' '}
              | {work.position} */}
              <CardHeader
                className="w-full"
                action={
                  work.endDate ? (
                    <History20Regular />
                  ) : (
                    <CheckmarkCircle20Filled className={styles.present} />
                  )
                }
                header={`${work.startDate} - ${work.endDate ? work.endDate : t('client.home.workHistory.present')}`}
              />
            </AccordionHeader>
          </AccordionItem>
        ))}
      </Accordion>
    )
  );
};

export default WorkHistory;
