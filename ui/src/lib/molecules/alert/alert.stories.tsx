import type { Meta, StoryObj } from '@storybook/react';

import { Alert } from './alert';

const meta: Meta<typeof Alert> = {
  title: 'Molecules/Alert',
  component: Alert,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Alert>;

export const Error: Story = {
  args: {
    variant: 'error',
    children: 'Something went wrong while contacting the server.',
  },
};

export const Info: Story = {
  args: {
    variant: 'info',
    children: 'Your session will expire in ten minutes.',
  },
};
