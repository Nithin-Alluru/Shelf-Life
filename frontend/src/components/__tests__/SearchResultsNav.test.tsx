import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SearchResultsNav from '../SearchResultsNav';

describe('SearchResultsNav', () => {
    it('renders Search Results Nav', () => {
        render(
            <BrowserRouter>
              <SearchResultsNav />
            </BrowserRouter>
          );
    });
    
});