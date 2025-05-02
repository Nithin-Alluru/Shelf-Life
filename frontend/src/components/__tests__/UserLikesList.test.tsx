import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import UserLikesList from '../UserLikesList';

describe('UserLikesList', () => {
    it('renders User Likes List', () => {
        render(
            <BrowserRouter>
              <UserLikesList />
            </BrowserRouter>
          );
    

    expect(screen.getByLabelText(/Loading.../i).toBeInTheDocument());
    });
});