import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import UserReviewsPage from '../UserReviewsPage';

describe('UserReviewsPage', () => {
    it('renders User Reviews Page', () => {
        render(
            <BrowserRouter>
              <UserReviewsPage />
            </BrowserRouter>
          );
    

    expect(screen.getByLabelText(/Loading reviews.../i).toBeInTheDocument());
    });
});