import { FluentProvider, Spinner, webDarkTheme, webLightTheme } from '@fluentui/react-components';
import { QueryClientProvider } from '@tanstack/react-query';
import { Suspense, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { RouterProvider } from 'react-router-dom';
import { queryClient } from './plugins/queryClient';
import AsyncDialogProvider from './providers/dialogProvider';
import LoadingProvider from './providers/loadingProvider';
import routes from './routes';
import useGlobalState from './stores/useGlobalState';
import { HtmlLangSync } from './stores/useHtmlLangSync';
import { useSystemTheme } from './stores/useSystemTheme';

const App = () => {
  const { t } = useTranslation();
  const { theme } = useGlobalState();
  const systemTheme = useSystemTheme();

  const actualTheme = theme === 'system' ? systemTheme : theme;
  useEffect(() => {
    document.documentElement.style.colorScheme = actualTheme;
  }, [actualTheme]);

  return (
    <FluentProvider
      theme={actualTheme === 'dark' ? webDarkTheme : webLightTheme}
      id="root-fluent-provider"
    >
      <QueryClientProvider client={queryClient}>
        <LoadingProvider>
          <AsyncDialogProvider>
            <HtmlLangSync />
            <Suspense
              fallback={
                <div className="flex min-h-dvh items-center justify-center">
                  <Spinner
                    appearance={actualTheme === 'dark' ? 'inverted' : 'primary'}
                    label={t('app.loading')}
                    labelPosition="below"
                    size="extra-large"
                  />
                </div>
              }
            >
              <RouterProvider router={routes} />
            </Suspense>
          </AsyncDialogProvider>
        </LoadingProvider>
      </QueryClientProvider>
    </FluentProvider>
  );
};

export default App;
