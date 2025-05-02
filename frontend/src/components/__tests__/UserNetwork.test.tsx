import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import UserNetwork from '../UserNetwork';

describe('UserNetwork', () => {
    it('renders User Network', () => {
        render(
            <BrowserRouter>
              <UserNetwork />
            </BrowserRouter>
          );
    

    expect(screen.getByLabelText(/Followers/i).toBeInTheDocument());
    expect(screen.getByLabelText(/Following/i).toBeInTheDocument());
    });
});