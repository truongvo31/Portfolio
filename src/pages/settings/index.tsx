import {
  Combobox,
  Option,
  Text,
  type OptionOnSelectData,
  type SelectionEvents,
} from '@fluentui/react-components';
import { Color24Regular, LocalLanguage24Regular } from '@fluentui/react-icons';
import { useTranslation } from 'react-i18next';
import PageHeader from '../../components/pageHeader';
import useGlobalState from '../../stores/useGlobalState';
import SettingCard from './components/settingCard';

const SettingsPage = () => {
  const { t } = useTranslation();
  const { theme, setTheme, lang, setLang } = useGlobalState();

  const changeTheme = (_: SelectionEvents, data: OptionOnSelectData) => {
    if (data.optionValue) {
      setTheme(data.optionValue as 'light' | 'dark' | 'system');
    }
  };

  const changeLanguage = (_: SelectionEvents, data: OptionOnSelectData) => {
    if (data.optionValue) {
      setLang(data.optionValue as 'en' | 'ja' | 'vi');
    }
  };

  return (
    <div className="h-full flex flex-col gap-4 container">
      <PageHeader pageTitle={t('settings.title')} description={t('settings.description')} />

      <div className="flex-1 overflow-auto px-4 md:px-6">
        <fieldset>
          <legend>
            <Text weight="semibold">{t('settings.appearance')}</Text>
          </legend>
          <div className="flex flex-col gap-2 py-4">
            <SettingCard
              icon={<Color24Regular />}
              title={t('settings.theme')}
              description={t('settings.themeDescription')}
            >
              <Combobox
                className="min-w-40! bg-inherit!"
                value={t(`settings.themeOptions.${theme}`)}
                selectedOptions={[theme]}
                onOptionSelect={changeTheme}
              >
                {['light', 'dark', 'system'].map((theme) => (
                  <Option key={theme} value={theme}>
                    {t(`settings.themeOptions.${theme}`)}
                  </Option>
                ))}
              </Combobox>
            </SettingCard>

            <SettingCard
              icon={<LocalLanguage24Regular />}
              title={t('settings.language')}
              description={t('settings.languageDescription')}
            >
              <Combobox
                className="min-w-40! bg-inherit!"
                value={t(`settings.languageOptions.${lang}`)}
                selectedOptions={[lang]}
                onOptionSelect={changeLanguage}
              >
                {['en', 'ja', 'vi'].map((language) => (
                  <Option key={language} value={language}>
                    {t(`settings.languageOptions.${language}`)}
                  </Option>
                ))}
              </Combobox>
            </SettingCard>
          </div>
        </fieldset>
      </div>
    </div>
  );
};

export default SettingsPage;
