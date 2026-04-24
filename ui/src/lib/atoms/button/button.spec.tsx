import { render, screen } from '@testing-library/react';

import { Button } from './button';

describe('Button', () => {
  it('should render', () => {
    render(<Button>Submit</Button>);
    expect(screen.getByRole('button', { name: 'Submit' })).toBeTruthy();
  });
});
