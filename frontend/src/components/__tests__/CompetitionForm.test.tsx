import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CompetitionForm from '../CompetitionForm';

describe('CompetitionForm', () => {
    it('renders Competition Form', () => {
        render(
            <BrowserRouter>
              <CompetitionForm />
            </BrowserRouter>
          );

    expect(screen.getByRole('button', { name: / Back/i}).toBeInTheDocument());
    expect(screen.getByLabelText(/New Competiton/i).toBeInTheDocument());
    expect(screen.getByLabelText(/Competition Name:/i).toBeInTheDocument());
    expect(screen.getByLabelText(/Competition end date:/i).toBeInTheDocument());
    expect(screen.getByLabelText(/Books /i).toBeInTheDocument());
    expect(screen.getByRole('Link', { name: /Add books /i}).toBeInTheDocument());
    expect(screen.getByRole('button', { name: /Remove/i}).toBeInTheDocument());
    expect(screen.getByRole('button', { name: /Create Competition/i}).toBeInTheDocument());
    
    });

    it('creates new competition', () => {
      render(
        <BrowserRouter>
          <CompetitionForm />
        </BrowserRouter>
      )
      const name_input = screen.getByLabelText(/Competition Name:/i);
      fireEvent.change(name_input, { target: { value: 'Summer Competition' } });
      expect(name_input.toHaveValue('Summer Competition'));

      const end_input = screen.getByLabelText(/Competition end date:/i);
      fireEvent.change(end_input, { target: { value: 'August 31, 2025' } });
      expect(end_input.toHaveValue('August 31, 2025'));

      fireEvent.click(screen.getByRole('Link', { name: /Add books /i}));

      fireEvent.click(screen.getByRole('button', { name: /Create Competition/i }));
  });
});