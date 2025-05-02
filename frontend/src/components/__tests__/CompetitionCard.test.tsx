import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CompetitionCard from '../CompetitionCard';

describe('CompetitionCard', () => {
    it('renders App Header', () => {
        render(
            <BrowserRouter>
              <CompetitionCard />
            </BrowserRouter>
          );
    });
    
});