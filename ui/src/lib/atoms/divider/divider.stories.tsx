import type { Meta, StoryObj } from '@storybook/react';

import { Divider } from './divider';
import { Text } from '../text/text';

const meta: Meta<typeof Divider> = {
  title: 'Atoms/Divider',
  component: Divider,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Divider>;

export const BetweenSections: Story = {
  render: () => (
    <div>
      <Text>Above</Text>
      <Divider />
      <Text>Below</Text>
    </div>
  ),
};
