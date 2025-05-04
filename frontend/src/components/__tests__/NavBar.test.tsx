import { render, fireEvent, screen, cleanup } from '@testing-library/react';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';
import NavBar from '../NavBar';
import CategoryPage from '../CategoryPage';
import CompetitionsPage from '../CompetitionsPage';
import Home from '../Home';

describe('NavBar Navigation', () => {
    afterEach(cleanup);

    it('navigates to browse books page', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path='/' element={<NavBar/>} />
                    <Route path='/categories/fiction' element={<CategoryPage/>}/>
                </Routes>
            </MemoryRouter>
        );
        fireEvent.click(screen.getByText('Browse Books'));
        expect(screen.getByText('Fiction')).toBeInTheDocument();
    });

    it ('navigates to home', () => {
        render(
            <MemoryRouter initialEntries={['/']}>

                    <Routes>
                        <Route path='/' element={<NavBar/>} />
                        <Route path='/Home' element={<Home/>}/>
                    </Routes>

            </MemoryRouter>
        );
        fireEvent.click(screen.getByText('Home'));
        expect(screen.getByText('Welcome to ShelfLife')).toBeInTheDocument();
    });

    it ('navigates to competitions page', async () => {
   
        render(
            <MemoryRouter initialEntries={['/']}>
            <Routes>
                <Route path='/' element={<NavBar/>} />
                <Route path='/competitions' element={<CompetitionsPage/>}/>
            </Routes>
        </MemoryRouter>
        );
        fireEvent.click(screen.getByText('Competitions'));
        expect(screen.getByText('Competitions')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Create Competition/i })).toBeInTheDocument();
    });



    it('renders Nav Bar', () => {
        render(
            <BrowserRouter>
              <NavBar />
            </BrowserRouter>
          );
        expect(screen.getByRole('Link', { name: /Home/i}).toBeInTheDocument());
        expect(screen.getByRole('Link', { name: /Browse Books/i}).toBeInTheDocument());
        expect(screen.getByRole('Link', { name: /Competitions/i}).toBeInTheDocument());
    });
});