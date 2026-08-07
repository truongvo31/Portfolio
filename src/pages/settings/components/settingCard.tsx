import type { Slot } from '@fluentui/react-components';
import { Text, makeStyles, tokens } from '@fluentui/react-components';

type SettingCardProps = {
  title: string;
  description?: string;
  icon?: Slot<'span'>;
  children?: React.ReactNode;
  onClick?: () => void;
};

const useFluentStyles = makeStyles({
  description: {
    color: tokens.colorNeutralForeground3,
    fontSize: tokens.fontSizeBase300,
  },
  card: {
    backgroundColor: tokens.colorBrandBackground2,
    borderRadius: tokens.borderRadiusMedium,
    border: `1px solid ${tokens.colorNeutralStroke3}`,
    ':hover': {
      backgroundColor: tokens.colorBrandBackground2Hover,
    },
  },
});

const SettingCard = ({ title, description, icon, children, onClick }: SettingCardProps) => {
  const fluentStyles = useFluentStyles();

  return (
    <div
      className={`px-4 py-2 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-center ${fluentStyles.card}`}
    >
      {/* Icon and title section - wrapped together for click handling */}
      <div className="flex items-center gap-4 lg:gap-6" onClick={onClick}>
        {icon as React.ReactNode}
        <div className="flex flex-col">
          <Text weight="semibold">{title}</Text>
          {description && <Text className={fluentStyles.description}>{description}</Text>}
        </div>
      </div>
      {/* Content section, displays children elements */}
      <div className="flex gap-2 items-center justify-center">{children}</div>
    </div>
  );
};

export default SettingCard;
