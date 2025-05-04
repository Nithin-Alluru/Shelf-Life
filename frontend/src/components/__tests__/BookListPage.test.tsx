import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import BookListPage from '../BookListPage';

describe('BookListPage', () => {
    it('renders List Page', () => {
        render(
            <BrowserRouter>
              <BookListPage />
            </BrowserRouter>
          );
    

    expect(screen.getByText('Loading Books...')).toBeInTheDocument();
    }); 
});