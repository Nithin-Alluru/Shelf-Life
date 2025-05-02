import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CompetitionDetailPage from '../CompetitionDetailPage';

describe('CompetitionCard', () => {
    it('renders Competition Card', () => {
        render(
            <BrowserRouter>
              <CompetitionDetailPage />
            </BrowserRouter>
          );
    

    expect(screen.getByLabelText(/Spring Reading Challenge/i).toBeInTheDocument());
    expect(screen.getByLabelText(/Read as many books as you can this spring!/i).toBeInTheDocument());
    expect(screen.getByLabelText(/Organized by the Book Club/i).toBeInTheDocument());
    expect(screen.getByLabelText(/Ends: May 30, 2025/i).toBeInTheDocument());
    expect(screen.getByLabelText(/Participants: 32/i).toBeInTheDocument());
    expect(screen.getByRole('button', { name: /Mark as Completed/i}).toBeInTheDocument());
    expect(screen.getByLabelText(/Leaderboard/i).toBeInTheDocument());
    expect(screen.getByLabelText(/Rank/i).toBeInTheDocument());
    expect(screen.getByLabelText(/Username/i).toBeInTheDocument());
    expect(screen.getByLabelText(/Progress/i).toBeInTheDocument());
    });
});