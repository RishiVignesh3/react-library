import type { Meta, StoryObj } from '@storybook/react';

import { Code } from './code';

const meta: Meta<typeof Code> = {
  title: 'Atoms/Code',
  component: Code,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Code>;

export const Inline: Story = {
  render: () => (
    <p style={{ color: 'var(--color-text)', fontFamily: 'var(--font-sans)' }}>
      Set <Code>VITE_OIDC_CLIENT_ID</Code> in your environment file.
    </p>
  ),
};
