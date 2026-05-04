import type { Meta, StoryObj } from '@storybook/react';

import { Section } from './section';
import { Text } from '../../atoms/text/text';

const meta: Meta<typeof Section> = {
  title: 'Molecules/Section',
  component: Section,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Section>;

export const Default: Story = {
  render: () => (
    <Section
      title="Token verification"
      description="Call a protected endpoint with valid and invalid bearer tokens."
    >
      <Text>Section body content.</Text>
    </Section>
  ),
};
