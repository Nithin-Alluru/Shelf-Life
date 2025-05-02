import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CategoryPage from '../CategoryPage';

describe('CategoryPage', () => {
    it('renders Category Page', () => {
        render(
            <BrowserRouter>
              <BookDetailCard />
            </BrowserRouter>
          );
    

    expect(screen.getByLabelText(/Loading books.../i).toBeInTheDocument());
    });
});