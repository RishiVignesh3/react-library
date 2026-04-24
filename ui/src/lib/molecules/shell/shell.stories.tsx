import type { Meta, StoryObj } from '@storybook/react';

import { Shell } from './shell';
import { Card } from '../card/card';
import { PageHeader } from '../page-header/page-header';
import { Badge } from '../../atoms/badge/badge';

const meta: Meta<typeof Shell> = {
  title: 'Molecules/Shell',
  component: Shell,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Shell>;

export const PageFrame: Story = {
  render: () => (
    <Shell>
      <PageHeader title="Demo app" badge={<Badge tone="accent">Lab</Badge>} />
      <Card>
        Content is centered with a comfortable max width.
      </Card>
    </Shell>
  ),
};
