import type { Meta, StoryObj } from '@storybook/react';

import { Text } from './text';

const meta: Meta<typeof Text> = {
  title: 'Atoms/Text',
  component: Text,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['body', 'lead', 'muted', 'small', 'label'],
    },
    mono: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof Text>;

export const Body: Story = {
  args: {
    children: 'Body copy uses the default text color and comfortable line height.',
  },
};

export const Muted: Story = {
  args: {
    variant: 'muted',
    children: 'Supporting text for descriptions and helper copy.',
  },
};

export const Label: Story = {
  args: {
    variant: 'label',
    children: 'Section label',
  },
};
