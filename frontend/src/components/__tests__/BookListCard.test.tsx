import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import BookListCard from '../BookListCard';

describe('BookListCard', () => {
    it('renders List Card', () => {
        render(
            <BrowserRouter>
              <BookListCard />
            </BrowserRouter>
          );
    

    expect(screen.getByRole('Link', { name: /See more/i}).toBeInTheDocument());
    expect(screen.getByRole('button', {name: /Remove from Competition/i}).toBeInTheDocument());
    expect(screen.getByRole('button', {name: /Add to Competition/i}).toBeInTheDocument());
    }); 
});