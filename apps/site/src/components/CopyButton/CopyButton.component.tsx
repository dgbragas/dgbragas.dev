import { useEffect, useRef, useState } from 'react';

import { Button } from '@dgbragas/yalatus';

export type CopyButtonProps = {
  /** Text placed on the clipboard. */
  value: string;
  /** Label of the button before copying. */
  label: string;
  /** Label shown and announced after copying. */
  copiedLabel: string;
};

/** MOTION: copied feedback, duration = 2000ms before the label returns. */
const FEEDBACK_DURATION = 2000;

/**
 * Button that copies a value to the clipboard and announces the result through a live region.
 */
export function CopyButton({ copiedLabel, label, value }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const timer = useRef(0);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), FEEDBACK_DURATION);
  };

  return (
    <>
      <Button
        appearance="neutral"
        kind="ghost"
        leadIcon={copied ? 'check' : 'copy'}
        onClick={() => void copy()}
      >
        {copied ? copiedLabel : label}
      </Button>
      <span aria-live="polite" className="yl-sr-only">
        {copied ? copiedLabel : ''}
      </span>
    </>
  );
}
