import { Button, Image, Text } from '@fluentui/react-components';
import { Mail24Regular } from '@fluentui/react-icons';
import { useTranslation } from 'react-i18next';
import Avatar from '../../../assets/icons/avatar.svg';
import FacebookIcon from '../../../assets/icons/facebook';
import GithubIcon from '../../../assets/icons/github';

const Introduction = ({ id }: { id: string }) => {
  const { t } = useTranslation();

  return (
    <div
      id={id}
      className="py-4 pt-8 grid grid-cols-1 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] gap-2"
    >
      <div className="order-2 md:order-1 flex flex-col gap-4 justify-between">
        <Text as="h3" weight="semibold" size={600}>
          {t('client.home.introduction.heading')}
        </Text>
        <Text as="p" size={400}>
          {t('client.home.introduction.description')}
        </Text>
        <Text as="p" size={400}>
          {t('client.home.introduction.cta')}
        </Text>
        <div className="flex gap-2">
          <a href="https://github.com/truongvo31" target="_blank" rel="noopener noreferrer">
            <Button icon={<GithubIcon />}>{t('client.home.introduction.social.github')}</Button>
          </a>
          <a
            href="https://www.facebook.com/MrPhongVeryNice"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button icon={<FacebookIcon />}>{t('client.home.introduction.social.facebook')}</Button>
          </a>
          <a href="mailto:nguyenvuhoangphong@gmail.com">
            <Button icon={<Mail24Regular />}>{t('client.home.introduction.social.email')}</Button>
          </a>
        </div>
      </div>
      <div className="flex justify-center order-1 md:order-2">
        <Image src={Avatar} alt={t('client.home.introduction.avatarAlt')} loading="lazy" />
      </div>
    </div>
  );
};

export default Introduction;
