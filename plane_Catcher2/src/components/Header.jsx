import React from 'react';
import '../Header.css';
import logo from '../assets/imgs/logo.png';


const Header = () => {
    
    return (
        <header className="header">
            
            <nav className='nav_header'>
                <div className='nav_flex'>
                <img className='logo' src={logo} alt='logo' />


                     <a className='nav_Home' href="#home"><span className='span_nav'>H</span>ome</a>


                     <a className='nav_How' href="#track_Steps">How it Works</a>

                     <a className='track_Nav' href="#form_Iata">Track my Flight</a>

                    <a className='nav_Why' href="#why_Us">Why Us</a>

                </div>

            </nav>
        </header>
    );
};

export default Header;
