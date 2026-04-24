import type { Meta, StoryObj } from '@storybook/react';

import { Input } from './input';

const meta: Meta<typeof Input> = {
  title: 'Input',
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

export const WithValue: Story = {
  args: {
    defaultValue: 'Hello',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    placeholder: 'Small',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    placeholder: 'Large',
  },
};

export const Disabled: Story = {
  args: {
    defaultValue: 'Read-only state',
    disabled: true,
  },
};

export const ReadOnly: Story = {
  args: {
    defaultValue: 'Cannot edit',
    readOnly: true,
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
      <label htmlFor="story-email" style={{ fontSize: '0.875rem', fontWeight: 600 }}>
        Email
      </label>
      <Input {...args} id="story-email" type="email" />
      <span id="email-error" style={{ fontSize: '0.8125rem', color: '#b91c1c' }}>
        Enter a valid email address.
      </span>
    </div>
  ),
};

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Password',
    autoComplete: 'current-password',
  },
};

export const InlineWidth: Story = {
  args: {
    inline: true,
    placeholder: 'Inline',
    style: { width: '12rem' },
  },
};
