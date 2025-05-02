import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Star from '../Star';

describe('Star', () => {
    it('renders Star', () => {
        render(
            <BrowserRouter>
              <Star />
            </BrowserRouter>
          );
    });

});