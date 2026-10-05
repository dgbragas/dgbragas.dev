import { forwardRef, useId, useRef, useState, type ForwardedRef, type KeyboardEvent } from 'react';

import { clsx } from 'clsx';

import { Stack } from '..';

import { nextTabId } from './Tabs.helpers';

import './Tabs.styles.scss';

import type { TabsElement, TabsProps } from './Tabs.types';

function TabsBase(
  { className, defaultValue, items, onChange, value, label = 'Seções', ...rest }: TabsProps,
  ref: ForwardedRef<TabsElement>
) {
  const baseId = useId();
  const tabRefs = useRef(new Map<string, HTMLButtonElement>());
  const [internal, setInternal] = useState(defaultValue ?? items.find(item => !item.disabled)?.id);
  const selected = value ?? internal;

  const styles = clsx('yl-tabs', className);

  const select = (id: string) => {
    if (value === undefined) setInternal(id);
    onChange?.(id);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, id: string) => {
    const next = nextTabId(items, id, event.key);
    if (!next) return;
    event.preventDefault();
    tabRefs.current.get(next)?.focus();
    select(next);
  };

  return (
    <Stack
      {...rest}
      aria-label={label}
      className={styles}
      gap="space-8"
      orientation="horizontal"
      ref={ref}
      role="tablist"
    >
      {items.map(item => {
        const active = item.id === selected;
        const itemStyles = clsx(
          'yl-tabs__tab',
          active && 'yl-tabs__tab--active',
          item.disabled && 'yl-tabs__tab--disabled'
        );

        return (
          <button
            aria-controls={item.panelId}
            aria-selected={active}
            className={itemStyles}
            disabled={item.disabled}
            id={`${baseId}-${item.id}`}
            key={item.id}
            onClick={() => select(item.id)}
            onKeyDown={event => handleKeyDown(event, item.id)}
            ref={node => {
              if (node) tabRefs.current.set(item.id, node);
              else tabRefs.current.delete(item.id);
            }}
            role="tab"
            tabIndex={active ? 0 : -1}
            type="button"
          >
            <span className="yl-tabs__label">{item.label}</span>
            {item.count !== undefined && (
              <>
                {/* The space keeps the accessible name readable */}{' '}
                <span className="yl-tabs__count">{item.count}</span>
              </>
            )}
          </button>
        );
      })}
    </Stack>
  );
}

/**
 * Horizontal list of tabs that selects one section at a time, with roving focus and arrow-key navigation.
 *
 * Works controlled through `value` and `onChange` or uncontrolled through `defaultValue`; give each item a `panelId` when a tab panel exists in the page.
 * @example
 * <Tabs items={[{ id: 'all', label: 'Todos', count: 10 }, { id: 'cases', label: 'Cases', count: 4 }]} onChange={setFilter} />
 * @example
 * <Tabs items={items} value={filter} onChange={setFilter} label="Filtrar portfólio" />
 */
export const Tabs = forwardRef<TabsElement, TabsProps>(TabsBase);
