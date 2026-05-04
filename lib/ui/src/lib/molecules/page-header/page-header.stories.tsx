import type { Meta, StoryObj } from '@storybook/react';

import { Badge } from '../../atoms/badge/badge';
import { PageHeader } from './page-header';

const meta: Meta<typeof PageHeader> = {
  title: 'Molecules/PageHeader',
  component: PageHeader,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof PageHeader>;

export const WithBadge: Story = {
  args: {
    title: 'pkce-spa',
    badge: <Badge tone="accent">OAuth · PKCE</Badge>,
  },
};
