import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AppHeader from '../AppHeader';

describe('AppHeader', () => {
    it('renders App Header', () => {
        render(
            <BrowserRouter>
              <AppHeader />
            </BrowserRouter>
          );

    expect(screen.getByRole('button', { name: /Sign In/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Register/i })).toBeInTheDocument();
    
  }); 
});