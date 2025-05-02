import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import YearlyProgressChart from '../YearlyProgressChart';

describe('YearlyProgressChart', () => {
    it('renders Yearly Progress Chart', () => {
        render(
            <BrowserRouter>
              <YearlyProgressChart />
            </BrowserRouter>
          );
    });

});