import { DropdownMenu as RUIDropdown } from 'radix-ui';

import './ShareDropdown.styles.scss';
import { Text } from '@/components/lib';

type ShareDropdownTypes = {
  className?: string;
  items: Array<{
    command?: {
      keys: string[];
      display: string;
    };
    href: string;
    text: string;
  }>;
  trigger: {
    label: string;
    text: string;
  };
};

const ShareDropdown = ({ items, trigger }: ShareDropdownTypes) => (
  <RUIDropdown.Root>
    <RUIDropdown.Trigger asChild>
      <button aria-label={trigger.label} className='share-dropdown__trigger'>
        {trigger.text}
      </button>
    </RUIDropdown.Trigger>

    <RUIDropdown.Portal>
      <RUIDropdown.Content className='share-dropdown'>
        {items.map(item => (
          <RUIDropdown.Item
            asChild
            className='share-dropdown__item'
            key={item.text}
          >
            <a href={item.href} target='_blank'>
              <Text variant='small'>{item.text}</Text>
              {item.command && (
                <Text element='small' variant='caption'>
                  {item.command.display}
                </Text>
              )}
            </a>
          </RUIDropdown.Item>
        ))}
      </RUIDropdown.Content>
    </RUIDropdown.Portal>
  </RUIDropdown.Root>
);

export { ShareDropdown, type ShareDropdownTypes };
