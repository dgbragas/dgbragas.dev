import { CursorHint, Text } from '@dgbragas/yalatus';

import type { BioPart, HintName } from '@/lib/copy/about';

export type BioProps = {
  /** Paragraphs of the bio, each a list of fragments. */
  paragraphs: BioPart[][];
  /** Image shown next to the pointer for each hint name. */
  hints: Record<HintName, { src: string; alt: string }>;
};

/**
 * Paragraphs of the about page where some words carry an image that follows the pointer.
 */
export function Bio({ hints, paragraphs }: BioProps) {
  return (
    <div className="site-bio">
      {paragraphs.map((parts, index) => (
        <Text
          className={index === paragraphs.length - 1 ? 'site-bio__closing' : undefined}
          color="fg-subtle"
          element="p"
          key={parts.map(part => part.text).join('')}
          kind="body-lg"
        >
          {parts.map(part => {
            if (part.hint) {
              const hint = hints[part.hint];
              return (
                <CursorHint alt={hint.alt} key={part.text} kind="image" src={hint.src}>
                  {part.text}
                </CursorHint>
              );
            }
            return part.strong ? <strong key={part.text}>{part.text}</strong> : part.text;
          })}
        </Text>
      ))}
    </div>
  );
}
