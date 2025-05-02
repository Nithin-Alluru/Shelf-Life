import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../Login';

describe('Login', () => {
    it('renders Login', () => {
        render(
            <BrowserRouter>
              <Login />
            </BrowserRouter>
          );

        expect(screen.getByLabelText(/Username/i).toBeInTheDocument());
        expect(screen.getByTypeText(/text/i).toBeInTheDocument());
        expect(screen.getByNameText(/username/i).toBeInTheDocument());
        expect(screen.getByIdText(/username/i).toBeInTheDocument());
        expect(screen.getByLabelText(/Password/i).toBeInTheDocument());
        expect(screen.getByTypeText(/password/i).toBeInTheDocument());
        expect(screen.getByNameText(/password/i).toBeInTheDocument());
        expect(screen.getByIdText(/password/i).toBeInTheDocument());
        expect(screen.getByRole('button', { name: /Sign in/i}).toBeInTheDocument());
        expect(screen.getByLabelText(/Don't have an account?/i).toBeInTheDocument());
        expect(screen.getByRole('Link', { name: /Sign up/i}).toBeInTheDocument());
    });

   

    it('updates username entry', () => {
        render(
          <BrowserRouter>
            <Login />
          </BrowserRouter>
        )
        const user_input = screen.getByLabelText(/Username/i);
        fireEvent.change(user_input, { target: { value: 'connorb24' } });
        expect(user_input.toHaveValue('connorb24'));

        const pass_input = screen.getByLabelText(/Password/i);
        fireEvent.change(pass_input, { target: { value: 'test' } });
        expect(pass_input.toHaveValue('test'));

        fireEvent.click(screen.getByRole('button', { name: /Sign in/i }));
    });
});