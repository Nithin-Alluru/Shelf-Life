import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CompStatus from '../CompStatus';

describe('CompStatus', () => {
    it('renders Comp Status', () => {
        render(
            <BrowserRouter>
              <CompStatus />
            </BrowserRouter>
          );
    

    expect(screen.getByLabelText(/# Books/i).toBeInTheDocument());
    expect(screen.getByLabelText(/ Edit/i).toBeInTheDocument());
    expect(screen.getByRole('Link', { name: /Edit/i}).toBeInTheDocument());
    expect(screen.getByRole('button', { name: /Clear List/i}).toBeInTheDocument());
    
    });
});