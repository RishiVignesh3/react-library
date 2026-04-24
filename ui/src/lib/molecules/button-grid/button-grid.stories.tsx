import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../../atoms/button/button';
import { ButtonGrid, ButtonGridCell } from './button-grid';

const meta: Meta<typeof ButtonGrid> = {
  title: 'Molecules/ButtonGrid',
  component: ButtonGrid,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ButtonGrid>;

export const TwoUp: Story = {
  render: () => (
    <ButtonGrid>
      <ButtonGridCell>
        <Button variant="positive" fullWidth>
          Primary action
        </Button>
      </ButtonGridCell>
      <ButtonGridCell>
        <Button variant="caution" fullWidth>
          Secondary check
        </Button>
      </ButtonGridCell>
    </ButtonGrid>
  ),
};
