import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Settings from '../Settings';

describe('Settings', () => {
    it('renders Settings', () => {
        render(
            <BrowserRouter>
              <Settings />
            </BrowserRouter>
          );
    

    expect(screen.getByLabelText(/Settings /i).toBeInTheDocument());
    expect(screen.getByRole('button', { name: /Delete My Account/i}).toBeInTheDocument());
    expect(screen.getByRole('button', { name: /Are you sure you would like to delete your account? This cannot be undone. /i}).toBeInTheDocument());
    expect(screen.getByRole('button', { name: /No, don't delete my account./i}).toBeInTheDocument());
    expect(screen.getByRole('button', { name: /Yes, I would like to delete my account./i}).toBeInTheDocument());
    });
});