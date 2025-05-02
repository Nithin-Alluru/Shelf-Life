import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import UserProfileCompetitionsSection from '../UserProfileCompetitionsSection';

describe('UserProfileCompetitionsSection', () => {
    it('renders User Profile Competitions Section', () => {
        render(
            <BrowserRouter>
              <UserProfileCompetitionsSection />
            </BrowserRouter>
          );
    

    expect(screen.getByLabelText(/Competitions: /i).toBeInTheDocument());
    expect(screen.getByLabelText(/My Competitions: /i).toBeInTheDocument());
    expect(screen.getByRole('button', { name: /+ Create Reading Competition/i}).toBeInTheDocument());
    });
});