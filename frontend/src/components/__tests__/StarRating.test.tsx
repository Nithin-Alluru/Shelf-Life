import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import StarRating from '../StarRating';

describe('StarRating', () => {
    it('renders Star Rating', () => {
        render(
            <BrowserRouter>
              <StarRating />
            </BrowserRouter>
          );
    });

});