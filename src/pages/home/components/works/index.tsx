import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  Caption1,
  Card,
  CardHeader,
  CardPreview,
  Image,
  makeStyles,
  tokens,
  type AccordionToggleEventHandler,
} from '@fluentui/react-components';
import {
  Building48Regular,
  CheckmarkCircle20Filled,
  History20Regular,
} from '@fluentui/react-icons';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import JapanIcon from '../../../../assets/icons/japan';
import VietnamIcon from '../../../../assets/icons/vietnam';
import FujitecLogo from '../../../../assets/images/fujitec.webp';
import HitachiLogo from '../../../../assets/images/hitachi.webp';
import HoangPhucLogo from '../../../../assets/images/hoangphuc.webp';
import WorkDescription from './workDescription';

interface WorkHistoryProps {
  id: string;
  selectedTabId: string | undefined;
  onTabSelected: (tabId: string) => void;
}

const useStyles = makeStyles({
  present: {
    color: tokens.colorPaletteGreenForeground1,
  },
  cardPreview: {
    height: '100px',
    padding: tokens.spacingHorizontalL,
    backgroundColor: tokens.colorNeutralForegroundStaticInverted,
    // border: `1px solid ${tokens.colorNeutralStroke1}`,
    '@media (min-width: 768px)': {
      height: '250px',
    },
  },
  noCompanyLogo: {
    color: '#000',
  },
  workDescription: {
    display: 'flex',
    flexDirection: 'column',
  },
});

const WorkHistory = ({ id, selectedTabId, onTabSelected }: WorkHistoryProps & { id: string }) => {
  const { t } = useTranslation();
  const styles = useStyles();

  let works = [
    {
      id: 'hitachi',
      company: t('client.home.workHistory.items.hitachi.company'),
      isCurrent: true,
      position: t('client.home.workHistory.items.hitachi.position'),
      startDate: '2025-10-08',
      description: <WorkDescription workId="hitachi" />,
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
      description: <WorkDescription workId="fujitec" />,
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
      description: <WorkDescription workId="usexpress" />,
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
      description: <WorkDescription workId="hoangphuc" />,
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
      <Accordion
        id={id}
        onToggle={handleToggle}
        openItems={selectedTabId ? selectedTabId : works[0].id}
      >
        {works.map((work) => (
          <AccordionItem key={work.id} value={work.id}>
            <AccordionHeader>
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
            <AccordionPanel>
              <Card appearance="outline">
                <CardHeader
                  header={<p className="text-lg font-semibold">{work.company}</p>}
                  description={<Caption1>{work.position}</Caption1>}
                  action={
                    work.location === 'japan' ? (
                      <JapanIcon size="2rem" />
                    ) : (
                      <VietnamIcon size="2rem" />
                    )
                  }
                />
                <CardPreview className={styles.cardPreview}>
                  {work.companyLogo ? (
                    <Image
                      src={work.companyLogo}
                      alt={`${work.company} logo`}
                      loading="lazy"
                      fit="contain"
                    />
                  ) : (
                    <Building48Regular className={styles.noCompanyLogo} />
                  )}
                </CardPreview>
                <div className={styles.workDescription}>
                  <WorkDescription workId={work.id} />
                </div>
              </Card>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    )
  );
};

export default WorkHistory;
