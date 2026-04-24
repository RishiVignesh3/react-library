import type { Meta, StoryObj } from '@storybook/react';

import { ResultCallout } from './result-callout';

const meta: Meta<typeof ResultCallout> = {
  title: 'Molecules/ResultCallout',
  component: ResultCallout,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ResultCallout>;

export const Success: Story = {
  args: {
    title: 'Access token',
    tone: 'success',
    summary: 'Success — 200 OK',
    body: '{"sub":"123","email":"you@example.com"}',
  },
};

export const Rejection: Story = {
  args: {
    title: 'Dummy token',
    tone: 'success',
    summary: 'Rejected as expected — 401 Unauthorized',
    body: '{"error":"invalid_token"}',
  },
};
