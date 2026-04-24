import type { Meta, StoryObj } from '@storybook/react';

import { Input } from './input';
import { Text } from '../text/text';

const meta: Meta<typeof Input> = {
  title: 'Atoms/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'search', 'tel', 'url'],
    },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    invalid: { control: 'boolean' },
    inline: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: 'Type something…',
  },
};

export const Invalid: Story = {
  args: {
    defaultValue: 'bad@',
    invalid: true,
    'aria-describedby': 'email-error',
  },
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
      <Text variant="label" as="label" htmlFor="story-email">
        Email
      </Text>
      <Input {...args} id="story-email" type="email" />
      <Text variant="small" id="email-error" style={{ color: 'var(--color-danger)' }}>
        Enter a valid email address.
      </Text>
    </div>
  ),
};
