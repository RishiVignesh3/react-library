import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './button';

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'outline',
        'danger',
        'ghost',
        'positive',
        'caution',
      ],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    fullWidth: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: { children: 'Primary' },
};

export const Secondary: Story = {
  args: { variant: 'secondary', children: 'Secondary' },
};

export const Danger: Story = {
  args: { variant: 'danger', children: 'Sign out' },
};

export const Positive: Story = {
  args: { variant: 'positive', children: 'Valid token check' },
};

export const Caution: Story = {
  args: { variant: 'caution', children: 'Invalid token check' },
};

export const FullWidth: Story = {
  args: { fullWidth: true, children: 'Full width' },
};
