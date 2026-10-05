import { useId, useRef, useState } from 'react';

import { Button, IconButton, PortfolioCard, Tabs, Text } from '@dgbragas/yalatus';
import { useReducedMotion } from '@dgbragas/yalatus/hooks';

import { countWork, filterWork, WORK_FILTERS, type WorkFilter, type WorkItem } from '@/lib/work';

import './WorkShowcase.styles.scss';

export type WorkShowcaseProps = {
  /** Work in display order, newest first. */
  items: WorkItem[];
  /** Strings of the section. */
  labels: {
    tabs: Record<WorkFilter, string>;
    tabsLabel: string;
    list: string;
    previous: string;
    next: string;
    viewAll: string;
    empty: string;
  };
  /** Address of the full archive. */
  viewAllHref: string;
};

/**
 * Filterable row of portfolio cards with arrows that slide one card at a time.
 */
export function WorkShowcase({ items, labels, viewAllHref }: WorkShowcaseProps) {
  const panelId = useId();
  const track = useRef<HTMLUListElement>(null);
  const reduced = useReducedMotion();
  const [filter, setFilter] = useState<WorkFilter>('all');

  const counts = countWork(items);
  const visible = filterWork(items, filter);
  const tabs = WORK_FILTERS.filter(kind => counts[kind] > 0).map(kind => ({
    id: kind,
    label: labels.tabs[kind],
    count: counts[kind],
    panelId,
  }));

  const slide = (direction: -1 | 1) => {
    const list = track.current;
    const card = list?.firstElementChild;
    if (!list || !card) return;
    const gap = parseFloat(getComputedStyle(list).columnGap) || 0;
    list.scrollBy({
      left: direction * (card.getBoundingClientRect().width + gap),
      behavior: reduced ? 'auto' : 'smooth',
    });
  };

  return (
    <div className="site-work">
      <div className="site-work__navigation">
        <Tabs
          items={tabs}
          label={labels.tabsLabel}
          onChange={id => setFilter(id as WorkFilter)}
          value={filter}
        />
        <div className="site-work__arrows">
          <IconButton
            appearance="neutral"
            icon="arrow-left"
            kind="ghost"
            label={labels.previous}
            onClick={() => slide(-1)}
            size="large"
          />
          <IconButton
            appearance="neutral"
            icon="arrow-right"
            kind="ghost"
            label={labels.next}
            onClick={() => slide(1)}
            size="large"
          />
        </div>
      </div>
      <div aria-label={labels.list} className="site-work__panel" id={panelId} role="tabpanel">
        {visible.length === 0 ? (
          <Text color="fg-subtle">{labels.empty}</Text>
        ) : (
          <ul className="site-work__track" ref={track}>
            {visible.map(item => (
              <li className="site-work__item" key={item.id}>
                <PortfolioCard
                  cover={
                    item.cover ? (
                      <img
                        alt={item.cover.alt}
                        decoding="async"
                        height={item.cover.height}
                        loading="lazy"
                        src={item.cover.src}
                        srcSet={item.cover.srcSet}
                        width={item.cover.width}
                      />
                    ) : (
                      <span className="site-work__placeholder" />
                    )
                  }
                  date={item.date}
                  dateTime={item.dateTime}
                  description={item.description}
                  href={item.href}
                  tag={item.tag}
                  title={item.title}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="site-work__footer">
        <Button as="a" href={viewAllHref} trailingIcon="arrow-right">
          {labels.viewAll}
        </Button>
      </div>
    </div>
  );
}
