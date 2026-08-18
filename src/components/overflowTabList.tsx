import {
  Button,
  makeStyles,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  Overflow,
  OverflowItem,
  Tab,
  TabList,
  tokens,
  useIsOverflowItemVisible,
  useOverflowMenu,
  type MenuItemProps,
} from '@fluentui/react-components';
import { bundleIcon, MoreHorizontalFilled, MoreHorizontalRegular } from '@fluentui/react-icons';

export type Tab = {
  id: string;
  name: string;
  icon?: React.ReactElement;
  content?: React.ReactNode;
};

const MoreHorizontal = bundleIcon(MoreHorizontalFilled, MoreHorizontalRegular);

type OverflowMenuItemProps = {
  tab: Tab;
  onClick: MenuItemProps['onClick'];
};

/**
 * A menu item for an overflow menu that only displays when the tab is not visible
 */
const OverflowMenuItem = ({ tab, onClick }: OverflowMenuItemProps) => {
  const isVisible = useIsOverflowItemVisible(tab.id);

  if (isVisible) {
    return null;
  }

  return (
    <MenuItem key={tab.id} icon={tab.icon} onClick={onClick}>
      <div>{tab.name}</div>
    </MenuItem>
  );
};

type OverflowMenuProps = {
  tabs: Tab[];
  menuCloseOnScroll?: boolean;
  onTabSelect?: (tabId: string) => void;
};

const useOverflowMenuStyles = makeStyles({
  menu: {
    backgroundColor: tokens.colorNeutralBackground1,
    maxHeight: '70dvh',
    overflowY: 'auto',
  },
});

/**
 * A menu for selecting tabs that have overflowed and are not visible.
 */
const OverflowMenu = ({ tabs, onTabSelect, menuCloseOnScroll }: OverflowMenuProps) => {
  const { ref, isOverflowing, overflowCount } = useOverflowMenu<HTMLButtonElement>();

  const styles = useOverflowMenuStyles();

  const onItemClick = (tabId: string) => {
    onTabSelect?.(tabId);
  };

  if (!isOverflowing) {
    return null;
  }

  return (
    <Menu hasIcons={tabs.some((tab) => !!tab.icon)} closeOnScroll={menuCloseOnScroll}>
      <MenuTrigger disableButtonEnhancement>
        <Button
          appearance="transparent"
          className="self-center"
          ref={ref}
          icon={<MoreHorizontal />}
          aria-label={`${overflowCount} more tabs`}
          role="tab"
        />
      </MenuTrigger>
      <MenuPopover>
        <MenuList className={styles.menu}>
          {tabs.map((tab) => (
            <OverflowMenuItem key={tab.id} tab={tab} onClick={() => onItemClick(tab.id)} />
          ))}
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};

const OverflowTabs = ({
  tabs,
  orientation,
  className,
  minimumVisible = 2,
  menuCloseOnScroll = false,
  onTabSelected,
  selectedId,
}: {
  tabs: Tab[];
  orientation?: 'horizontal' | 'vertical';
  className?: string;
  minimumVisible?: number;
  menuCloseOnScroll?: boolean;
  onTabSelected?: (tabId: string) => void;
  selectedId?: string;
}) => {
  const selectedTabId = selectedId ?? tabs[0]?.id;

  return (
    <div className="flex flex-col gap-2">
      <Overflow
        minimumVisible={minimumVisible}
        overflowAxis={orientation === 'vertical' ? 'vertical' : 'horizontal'}
      >
        <TabList
          className={className}
          vertical={orientation === 'vertical'}
          selectedValue={selectedTabId}
          onTabSelect={(_, d) => onTabSelected?.(d.value as string)}
        >
          {tabs.map((tab) => {
            return (
              <OverflowItem key={tab.id} id={tab.id} priority={tab.id === selectedTabId ? 2 : 1}>
                <Tab value={tab.id} icon={tab.icon ? <span>{tab.icon}</span> : undefined}>
                  {tab.name}
                </Tab>
              </OverflowItem>
            );
          })}
          <OverflowMenu
            onTabSelect={onTabSelected}
            tabs={tabs}
            menuCloseOnScroll={menuCloseOnScroll}
          />
        </TabList>
      </Overflow>
      <div className="px-2.5">
        {tabs[tabs.findIndex((tab) => tab.id === selectedTabId)]?.content}
      </div>
    </div>
  );
};

export default OverflowTabs;
