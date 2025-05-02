import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../Home';

describe('Home', () => {
    it('renders Home', () => {
        render(
            <BrowserRouter>
              <Home />
            </BrowserRouter>
          );
    

    expect(screen.getByLabelText(/Welcome to ShelfLife/i).toBeInTheDocument());
    expect(screen.getByLabelText(/Connect through your reading journey/i).toBeInTheDocument());
    expect(screen.getByLabelText(/ ShelfLife/i).toBeInTheDocument());
    expect(screen.getByLabelText(/ a place for readers to log, review, and discover books and connect with others through discussions and competitions./i).toBeInTheDocument());
    expect(screen.getByLabelText(/Loading Review Data/i).toBeInTheDocument());
    expect(screen.getByLabelText(/The Great Gatsby/i).toBeInTheDocument());
    expect(screen.getByLabelText(/by/i).toBeInTheDocument());
    expect(screen.getByLabelText(/F. Scott Fitzgerald/i).toBeInTheDocument());
    expect(screen.getByLabelText(/UserName/i).toBeInTheDocument());
    expect(screen.getByLabelText(/One of the most influential novels of the last century, Fitzgerald's The Great Gatsby takes the mask off the Art Deco era's glamorous facade./i).toBeInTheDocument());
    expect(screen.getByLabelText(/Ready to get started?/i).toBeInTheDocument());
    expect(screen.getByRole('button', { name: /Sign In/i}).toBeInTheDocument());
    expect(screen.getByRole('button', { name: /Register/i}).toBeInTheDocument());
    });
});