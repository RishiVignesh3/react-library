import type { Meta, StoryObj } from '@storybook/react';

import { Card } from './card';
import { Text } from '../../atoms/text/text';

const meta: Meta<typeof Card> = {
  title: 'Molecules/Card',
  component: Card,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card>
      <Text variant="lead">Card title area</Text>
      <Text variant="muted">
        Use cards to group related content and actions in a raised surface.
      </Text>
    </Card>
  ),
};
