import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AppFooter from '../AppFooter';

describe('AppFooter', () => {
    it('renders App Footer', () => {
        render(
            <BrowserRouter>
              <AppFooter />
            </BrowserRouter>
          );
    });
}); 