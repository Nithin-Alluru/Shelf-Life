import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import BookDetailCard from '../BookDetailCard';

describe('BookDetailCard', () => {
    it('renders Detail Card', () => {
        render(
            <BrowserRouter>
              <BookDetailCard />
            </BrowserRouter>
          );
    

    expect(screen.getByLabelText(/Average Rating/i).toBeInTheDocument());
    expect(screen.getByLabelText(/Estimated Read Time/i).toBeInTheDocument());
    expect(screen.getByRole('button', { name: /Mark As Read/i}).toBeInTheDocument());
    expect(screen.getByRole('button', { name: /+ New Review/i}).toBeInTheDocument());
  });  
});