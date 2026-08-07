import { ProgressBar, Spinner, Text, tokens } from '@fluentui/react-components';
import { getSystemTheme } from '../helpers/themeHelper';
import useGlobalState from '../stores/useGlobalState';
import useLoading from '../stores/useLoading';

const LoadingOverlay = () => {
  const { isLoading, message, progress } = useLoading();
  const { theme } = useGlobalState();
  const actualTheme = theme === 'system' ? getSystemTheme() : theme;

  if (!isLoading) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center backdrop-blur-md"
      style={{ zIndex: tokens.zIndexFloating }}
      role="alert"
      aria-live="assertive"
      aria-busy="true"
    >
      <div>
        <Spinner
          appearance={actualTheme === 'dark' ? 'inverted' : 'primary'}
          size="huge"
          label={message ?? 'Loading'}
          labelPosition="below"
        />

        {progress !== undefined ? (
          <div className="mt-4 flex flex-col gap-2 w-70">
            <ProgressBar value={progress / 100} max={1} thickness="large" />
            <Text align="center" size={300}>
              {progress}%
            </Text>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default LoadingOverlay;
