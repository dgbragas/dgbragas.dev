import { Tabs as RadixTabs } from 'radix-ui';

type TabsListProps = {
  ariaLabel: string;
  children: React.ReactNode;
};

type TabsTriggerProps = {
  children: React.ReactNode;
  value: string;
};

type TabsContentProps = {
  children: React.ReactNode;
  value: string;
};

type TabsProps = {
  children?: React.ReactNode;
  defaultValue: string;
};

type CompoundedTabs = React.FC<TabsProps> & {
  Content: React.FC<TabsContentProps>;
  List: React.FC<TabsListProps>;
  Trigger: React.FC<TabsTriggerProps>;
};

const TabsList = ({ ariaLabel, children }: TabsListProps) => (
  <RadixTabs.List aria-label={ariaLabel}>{children}</RadixTabs.List>
);

const TabsTrigger = ({ children, value }: TabsTriggerProps) => (
  <RadixTabs.Trigger value={value}>{children}</RadixTabs.Trigger>
);

const TabsContent = ({ children, value }: TabsContentProps) => (
  <RadixTabs.Content value={value}>{children}</RadixTabs.Content>
);

const Tabs = ({ children, defaultValue }: TabsProps) => (
  <RadixTabs.Root defaultValue={defaultValue}>{children}</RadixTabs.Root>
);
