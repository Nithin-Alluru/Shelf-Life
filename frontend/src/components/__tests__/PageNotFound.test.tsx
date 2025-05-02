import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PageNotFound from '../PageNotFound';

describe('PageNotFound', () => {
    it('renders Page Not Found', () => {
        render(
            <BrowserRouter>
              <PageNotFound />
            </BrowserRouter>
          );
    

    expect(screen.getByLabelText(/Oops! We couldn't find the page you were looking for. /i).toBeInTheDocument());
    });
});