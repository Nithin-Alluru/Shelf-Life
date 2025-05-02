import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import UserProfile from '../UserProfile';

describe('UserProfile', () => {
    it('renders User Profile', () => {
        render(
            <BrowserRouter>
              <UserProfile />
            </BrowserRouter>
          );
    

    expect(screen.getByLabelText(/Books Read/i).toBeInTheDocument());
    expect(screen.getByLabelText(/My reading goal for /i).toBeInTheDocument());
    });
});