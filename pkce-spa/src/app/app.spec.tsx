import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { AuthProvider } from '../auth/AuthProvider';
import App from './app';

function renderWithShell() {
  return render(
    <MemoryRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </MemoryRouter>,
  );
}

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = renderWithShell();
    expect(baseElement).toBeTruthy();
  });

  it('should show the app name', () => {
    const { getByRole } = renderWithShell();
    expect(getByRole('heading', { name: /pkce-spa/i })).toBeTruthy();
  });
});
