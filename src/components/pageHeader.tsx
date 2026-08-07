import { makeStyles, Text, tokens } from '@fluentui/react-components';

const useFluentStyles = makeStyles({
  description: {
    color: tokens.colorNeutralForeground3,
    fontSize: tokens.fontSizeBase300,
  },
});

const PageHeader = ({
  pageTitle,
  description,
  className = '',
}: {
  pageTitle: string;
  description?: string;
  className?: string;
}) => {
  const styles = useFluentStyles();
  return (
    <div className={'p-6 font-semibold text-2xl ' + className}>
      <div className="flex flex-col">
        <Text size={600} weight="semibold">
          {pageTitle}
        </Text>
        {description && <Text className={styles.description}>{description}</Text>}
      </div>
    </div>
  );
};

export default PageHeader;
