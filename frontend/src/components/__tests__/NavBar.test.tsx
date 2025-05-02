import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NavBar from '../NavBar';

describe('NavBar', () => {
    it('renders Nav Bar', () => {
        render(
            <BrowserRouter>
              <NavBar />
            </BrowserRouter>
          );
    

    expect(screen.getByRole('Link', { name: /Home/i}).toBeInTheDocument());
    expect(screen.getByRole('Link', { name: /Browse Books/i}).toBeInTheDocument());
    expect(screen.getByRole('Link', { name: /Competitions/i}).toBeInTheDocument());
    });
});