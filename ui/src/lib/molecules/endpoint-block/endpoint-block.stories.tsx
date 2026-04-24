import type { Meta, StoryObj } from '@storybook/react';

import { EndpointBlock } from './endpoint-block';

const meta: Meta<typeof EndpointBlock> = {
  title: 'Molecules/EndpointBlock',
  component: EndpointBlock,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof EndpointBlock>;

export const Default: Story = {
  args: {
    url: 'https://openidconnect.googleapis.com/v1/userinfo',
  },
};
