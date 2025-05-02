import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import MinBookBox from '../MinBookBox';

describe('MinBookBox', () => {
    it('renders Min Book Box', () => {
        render(
            <BrowserRouter>
              <MinBookBox />
            </BrowserRouter>
          );
    });
});