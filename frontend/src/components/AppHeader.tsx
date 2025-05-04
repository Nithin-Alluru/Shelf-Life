import '../assets/css/global.css';
import '../assets/css/AppHeader.css';
import AppLogo from '../assets/images/logo.svg';
import { Link, useNavigate, useParams } from 'react-router-dom';
import NavBar from './NavBar';
import SearchBar from "./SearchBar";
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useEffect } from 'react';
import { AuthStore } from '../Contexts/AuthContext';
import { User } from '../types';
import HamburgerMenu from './HamburgerMenu';
import UserLoginStatus from './UserLoginStatus';

function AppHeader() {
    const nav = useNavigate();
    const par = useParams();
    const token = sessionStorage.getItem('access_token');


    useEffect(() => {
        if (!token && !par) {
            logOut();
        }
    })
    
    function logOut(){
        sessionStorage.removeItem('User');
        sessionStorage.removeItem("access_token");
        localStorage.removeItem("CompBookList");
        nav('/login');
    }

    return (<header className="app-header">
            <Link to="/">
                <img src={AppLogo} alt="Logo"/>
            </Link>
            <div className='header-content'>
                <SearchBar />  
                <HamburgerMenu/>
                <NavBar />
                <UserLoginStatus/>
            </div>
        </header>);
}
export default AppHeader;
