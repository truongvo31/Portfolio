import { Button, makeStyles, Text } from '@fluentui/react-components';
import { bundleIcon, Home20Filled, Home20Regular } from '@fluentui/react-icons';
import { Link } from 'react-router-dom';

const HomeIcon = bundleIcon(Home20Filled, Home20Regular);

const useStyles = makeStyles({
  error: {
    color: 'var(--ui-text-dimmed)',
    fontSize: '7rem',
    position: 'relative',
    lineHeight: 1,
    width: '12.5rem',

    '&::after': {
      content: 'attr(data-text)',
      position: 'absolute',
      left: '2px',
      textShadow: '-1px 0 #e74a3b',
      top: 0,
      color: 'var(--ui-text-dimmed)',
      background: 'var(--colorNeutralBackground1)',
      overflow: 'hidden',
      clip: 'rect(0, 900px, 0, 0)',
      animation: 'noise-anim 2s infinite linear alternate-reverse',
    },

    '&::before': {
      content: 'attr(data-text)',
      position: 'absolute',
      left: '-2px',
      textShadow: '-1px 0 #4e73df',
      top: 0,
      color: 'var(--ui-text-dimmed)',
      background: 'var(--colorNeutralBackground1)',
      overflow: 'hidden',
      clip: 'rect(0, 900px, 0, 0)',
      animation: 'noise-anim2 3s infinite linear alternate-reverse',
    },
  },
});

type ErrorProps = {
  code: number;
  message: string;
};

const ErrorPage = ({ code, message }: ErrorProps) => {
  return (
    <div className="h-dvh flex flex-col items-center justify-center gap-4 text-(--colorNeutralForeground2)">
      <Text as="h1" className={useStyles().error} data-text={code}>
        {code}
      </Text>
      <p className="text-2xl">{message}</p>
      <Link to="/">
        <Button appearance="primary" icon={<HomeIcon />}>
          Back to Home
        </Button>
      </Link>
    </div>
  );
};

export default ErrorPage;
