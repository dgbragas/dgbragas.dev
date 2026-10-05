import { CompanyCard } from '@dgbragas/yalatus';

export type ExperienceItem = {
  id: string;
  name: string;
  position: string;
  period: string;
  color: string;
  logo: { src: string; width: number; height: number };
};

export type ExperienceListProps = {
  /** Positions in reverse chronological order. */
  items: ExperienceItem[];
};

/**
 * List of company cards; logos arrive as image sources so the Astro page can pass them as data.
 */
export function ExperienceList({ items }: ExperienceListProps) {
  return (
    <ul className="site-experience">
      {items.map(item => (
        <CompanyCard
          color={item.color}
          key={item.id}
          logo={
            <img alt="" height={item.logo.height} src={item.logo.src} width={item.logo.width} />
          }
          name={item.name}
          period={item.period}
          position={item.position}
        />
      ))}
    </ul>
  );
}
