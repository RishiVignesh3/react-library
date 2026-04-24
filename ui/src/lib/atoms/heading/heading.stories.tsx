import type { Meta, StoryObj } from '@storybook/react';

import { Heading } from './heading';

const meta: Meta<typeof Heading> = {
  title: 'Atoms/Heading',
  component: Heading,
  tags: ['autodocs'],
  argTypes: {
    level: { control: 'select', options: [1, 2, 3, 4, 5, 6] },
  },
};

export default meta;

type Story = StoryObj<typeof Heading>;

export const H1: Story = {
  args: {
    level: 1,
    children: 'Display heading',
  },
};

export const H2: Story = {
  args: {
    level: 2,
    children: 'Section title',
  },
};

export const H5LabelStyle: Story = {
  args: {
    level: 5,
    children: 'Eyebrow / meta',
  },
};
