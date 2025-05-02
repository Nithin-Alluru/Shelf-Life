import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import UserCard from '../UserCard';

describe('UserCard', () => {
    it('renders User Card', () => {
        render(
            <BrowserRouter>
              <UserCard />
            </BrowserRouter>
          );
    

    expect(screen.getByRole('button', { name: /Follow/i}).toBeInTheDocument());
    });
});