import type { Meta, StoryObj } from '@storybook/react';

import { Badge } from './badge';

const meta: Meta<typeof Badge> = {
  title: 'Atoms/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    tone: {
      control: 'select',
      options: ['default', 'accent', 'success', 'warn'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Accent: Story = {
  args: {
    tone: 'accent',
    children: 'OAuth · PKCE',
  },
};

export const Default: Story = {
  args: {
    children: 'Draft',
  },
};
