import React from 'react';
import '../Header.css';
import logo from '../assets/imgs/logo.png';

const Header = () => {
    return (
        <header className="header">
            <nav className='nav_header'>
                <div className='nav_flex'>
                <img className='logo' src={logo} alt='logo' />
                <a href="#section1"><span className='span_nav'>H</span>ome</a>
                <a href="#section2">Explore</a>
                <a className='track_Nav' href="#flightId">Track my Flight</a>
                <a href="#section3">Contact Us</a>
                </div>
            </nav>
        </header>
    );
};

export default Header;
