import {
  Button,
  Caption1,
  Card,
  CardFooter,
  CardHeader,
  CardPreview,
  Divider,
  Image,
  makeStyles,
  tokens,
} from '@fluentui/react-components';
import { WindowNew24Regular } from '@fluentui/react-icons';
import { useTranslation } from 'react-i18next';
import JapanIcon from '../../../../assets/icons/japan';
import VietnamIcon from '../../../../assets/icons/vietnam';
import FutabaLogo from '../../../../assets/images/futaba.png';
import TdtuLogo from '../../../../assets/images/tdtu.webp';

type educationItem = {
  id: string;
  school: string;
  department: string;
  field?: string;
  degree: string;
  startDate: string;
  endDate?: string;
  schoolUrl?: string;
  schoolLogo?: string;
  place?: 'japan' | 'vietnam';
};

const useStyles = makeStyles({
  cardPreview: {
    height: '120px',
    padding: tokens.spacingHorizontalL,
    backgroundColor: tokens.colorNeutralForegroundStaticInverted,
  },
});

const Educations = ({ id }: { id: string }) => {
  const { t } = useTranslation();
  const styles = useStyles();

  const educations: educationItem[] = [
    {
      id: 'futaba',
      school: t('client.home.education.items.futaba.school'),
      department: t('client.home.education.items.futaba.department'),
      degree: t('client.home.education.items.futaba.degree'),
      startDate: '2020-11-01',
      endDate: '2022-03-14',
      schoolUrl: 'https://www.futabacollege.com/jap/html/main/main.asp',
      schoolLogo: FutabaLogo,
      place: 'japan',
    },
    {
      id: 'tdtu',
      school: t('client.home.education.items.tdtu.school'),
      department: t('client.home.education.items.tdtu.department'),
      field: t('client.home.education.items.tdtu.field'),
      degree: t('client.home.education.items.tdtu.degree'),
      startDate: '2014-09-01',
      endDate: '2019-06-19',
      schoolUrl: t('client.home.education.items.tdtu.url'),
      schoolLogo: TdtuLogo,
      place: 'vietnam',
    },
  ];

  return (
    <div id={id} className="grid grid-cols-1 md:grid-cols-2 gap-2">
      {educations.map((education) => (
        <Card key={education.id} appearance="outline">
          <CardPreview className={styles.cardPreview}>
            {education.schoolLogo ? (
              <Image
                src={education.schoolLogo}
                alt={education.school}
                loading="lazy"
                fit="contain"
              />
            ) : null}
          </CardPreview>
          <CardHeader
            image={
              education.place === 'japan' ? <JapanIcon size="2rem" /> : <VietnamIcon size="2rem" />
            }
            header={<p className="font-semibold">{education.school}</p>}
            description={<Caption1>{education.department}</Caption1>}
            action={
              <Button
                onClick={() => education.schoolUrl && window.open(education.schoolUrl, '_blank')}
                icon={<WindowNew24Regular />}
                appearance="transparent"
              />
            }
          />
          <Divider />
          <CardFooter className="justify-between">
            <div className="">{education.degree}</div>
            <div className="">
              {education.startDate} &rarr; {education.endDate}
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default Educations;
