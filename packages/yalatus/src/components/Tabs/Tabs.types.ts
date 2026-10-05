import type { HTMLAttributes } from 'react';

import type { BaseComponentProps, MergeProps } from '@dgbragas/yalatus/helpers';

type TabsElement = HTMLDivElement;

/** One tab of the list. */
type TabItem = {
  /** Value reported by `onChange` and compared with `value`. */
  id: string;
  /** Visible text of the tab. */
  label: string;
  /** Number of items behind the tab, drawn after the label. */
  count?: number;
  /** Removes the tab from interaction while keeping it visible. */
  disabled?: boolean;
  /** Id of the panel the tab controls, when there is one in the page. */
  panelId?: string;
};

type YalatusTabs = Omit<BaseComponentProps, 'children'> & {
  /** Tabs in display order. */
  items: TabItem[];
  /** Controlled mode: id of the selected tab. */
  value?: string;
  /** Uncontrolled mode: id selected at first render; the first enabled tab when absent. */
  defaultValue?: string;
  /** Called when a tab is selected by pointer or keyboard, with its id. */
  onChange?: (id: string) => void;
  /**
   * Accessible name of the list.
   * @default 'Seções'
   */
  label?: string;
};

type TabsProps = MergeProps<YalatusTabs, Omit<HTMLAttributes<TabsElement>, 'onChange'>>;

export type { TabItem, TabsElement, TabsProps };
