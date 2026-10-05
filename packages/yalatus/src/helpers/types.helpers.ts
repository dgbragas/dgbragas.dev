import type { CSSProperties, ReactNode } from 'react';

/** Props every Yalatus component accepts on its root element. */
export type BaseComponentProps = {
  /** Extra class names appended after the component's own classes. */
  className?: string;
  /** Inline styles forwarded to the root element. */
  style?: CSSProperties;
  /** Content rendered inside the component. */
  children?: ReactNode;
  /** Hook for test selectors. */
  'data-testid'?: string;
};

/** Merges component props over native attributes, letting the component's definition win on name clashes. */
export type MergeProps<T, U> = Omit<U, keyof T> & T;

/** `Omit` that distributes over each member of a union instead of collapsing it. */
export type DistributiveOmit<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never;

/** Makes the listed keys optional and keeps the rest untouched. */
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/** Makes the listed keys required and keeps the rest untouched. */
export type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;
