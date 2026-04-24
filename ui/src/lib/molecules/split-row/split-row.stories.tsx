import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../../atoms/button/button';
import { Text } from '../../atoms/text/text';
import { SplitRow } from './split-row';

const meta: Meta<typeof SplitRow> = {
  title: 'Molecules/SplitRow',
  component: SplitRow,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof SplitRow>;

export const ProfileActions: Story = {
  render: () => (
    <SplitRow
      main={
        <div>
          <Text variant="label">Signed in</Text>
          <Text variant="lead">alex@example.com</Text>
        </div>
      }
      actions={
        <Button variant="danger" size="md">
          Sign out
        </Button>
      }
    />
  ),
};
