import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CategoryNav from '../CategoryNav';

describe('CategoryNav', () => {
    it('renders Category Nav', () => {
        render(
            <BrowserRouter>
              <CategoryNav />
            </BrowserRouter>
          );
    });
    
});