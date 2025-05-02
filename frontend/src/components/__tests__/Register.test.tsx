import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Register from '../Register';

describe('Register', () => {
    it('renders Register', () => {
        render(
            <BrowserRouter>
              <Register />
            </BrowserRouter>
          );
    

    expect(screen.getByLabelText(/First Name/i).toBeInTheDocument());
    expect(screen.getByLabelText(/Last Name/i).toBeInTheDocument());
    expect(screen.getByLabelText(/Username/i).toBeInTheDocument());
    expect(screen.getByLabelText(/Password/i).toBeInTheDocument());
    expect(screen.getByRole('button', { name: /Register/i}).toBeInTheDocument());
    expect(screen.getByLabelText(/Already have an account?/i).toBeInTheDocument());
    expect(screen.getByRole('Link', { name: /Sign In/i}).toBeInTheDocument());

    });

    it('registers new user', () => {
      render(
        <BrowserRouter>
          <Register />
        </BrowserRouter>
      )
      const first_name_input = screen.getByLabelText(/First Name/i);
      fireEvent.change(first_name_input, { target: { value: 'Connor' } });
      expect(first_name_input.toHaveValue('Connor'));

      const last_name_input = screen.getByLabelText(/Last Name/i);
      fireEvent.change(last_name_input, { target: { value: 'Burch' } });
      expect(last_name_input.toHaveValue('Burch'));

      const user_input = screen.getByLabelText(/Username/i);
      fireEvent.change(user_input, { target: { value: 'connorb24' } });
      expect(user_input.toHaveValue('connorb24'));

      const pass_input = screen.getByLabelText(/Password/i);
      fireEvent.change(pass_input, { target: { value: 'test' } });
      expect(pass_input.toHaveValue('test'));

      fireEvent.click(screen.getByRole('button', { name: /Register/i }));
  });
    
});