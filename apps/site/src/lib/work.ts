export const WORK_FILTERS = ['all', 'cases', 'landing', 'portfolio'] as const;

export type WorkFilter = (typeof WORK_FILTERS)[number];
export type WorkKind = Exclude<WorkFilter, 'all'>;

export type WorkCover = {
  src: string;
  srcSet?: string;
  width: number;
  height: number;
  alt: string;
};

/** One project or case ready to be drawn by a card. */
export type WorkItem = {
  id: string;
  href: string;
  title: string;
  description: string;
  tag: string;
  kind: WorkKind;
  date: string;
  dateTime: string;
  cover?: WorkCover;
};

/**
 * Keeps the items of one kind, or all of them.
 * @param items - Work in display order
 * @param filter - Kind to keep; `all` keeps everything
 * @returns The matching items in the same order
 */
export function filterWork<T extends { kind: WorkKind }>(items: T[], filter: WorkFilter): T[] {
  return filter === 'all' ? items : items.filter(item => item.kind === filter);
}

/**
 * Counts how many items each filter would show.
 * @param items - Work to count
 * @returns A count per filter, including `all`
 */
export function countWork(items: { kind: WorkKind }[]): Record<WorkFilter, number> {
  const counts: Record<WorkFilter, number> = {
    all: items.length,
    cases: 0,
    landing: 0,
    portfolio: 0,
  };
  items.forEach(item => {
    counts[item.kind] += 1;
  });
  return counts;
}

/**
 * Orders newest first by the ISO date carried in `dateTime`.
 * @param a - First item
 * @param b - Second item
 * @returns A negative number when `a` is newer than `b`
 */
export function byNewest(a: { dateTime: string }, b: { dateTime: string }): number {
  return b.dateTime.localeCompare(a.dateTime);
}
