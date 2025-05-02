import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ReviewCard from '../ReviewCard';

describe('ReviewCard', () => {
    it('renders Review Card', () => {
        render(
            <BrowserRouter>
              <ReviewCard />
            </BrowserRouter>
          );
    });

});