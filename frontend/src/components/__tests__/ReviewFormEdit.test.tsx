import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ReviewFormEdit from '../ReviewFormEdit';

describe('ReviewFormEdit', () => {
    it('renders Review Form', () => {
        render(
            <BrowserRouter>
              <ReviewFormEdit />
            </BrowserRouter>
          );
    

    expect(screen.getByLabelText(/My Review for /i).toBeInTheDocument());
    expect(screen.getByLabelText(/Rating: /i).toBeInTheDocument());
    expect(screen.getByLabelText(/Liked: /i).toBeInTheDocument());
    expect(screen.getByRole('button', { name: /Submit/i}).toBeInTheDocument());
    });
});