import { makeStyles, Text, tokens } from '@fluentui/react-components';

const useFluentStyles = makeStyles({
  description: {
    color: tokens.colorNeutralForeground3,
  },
});

const PageHeader = ({
  pageTitle,
  description,
  children,
}: {
  pageTitle: string;
  description?: string;
  children?: React.ReactNode;
}) => {
  const styles = useFluentStyles();
  return (
    <div className={'p-2 md:p-6 grid gap-2 grid-cols-1 md:grid-cols-[1fr_auto]'}>
      <div className="flex flex-col">
        <Text size={600} weight="semibold">
          {pageTitle}
        </Text>
        {description && <Text className={styles.description}>{description}</Text>}
      </div>
      <div className="flex items-center gap-2 flex-wrap">{children}</div>
    </div>
  );
};

export default PageHeader;
