import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import BookDetailPage from '../BookDetailPage';

describe('BookDetailPage', () => {
    it('renders Detail Page', () => {
        render(
            <BrowserRouter>
              <BookDetailPage />
            </BrowserRouter>
          );
    

    expect(screen.getByRole('button', {name: /Back/i}).toBeInTheDocument());
    expect(screen.getByLabelText(/Reviews/i).toBeInTheDocument());
    expect(screen.getByLabelText(/Loading reviews.../i).toBeInTheDocument());
    });
});