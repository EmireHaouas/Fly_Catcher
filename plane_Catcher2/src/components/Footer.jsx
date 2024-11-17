import React from 'react';
import '../Footer.css';
import logo from '../assets/imgs/logo.png'

const Main = () => {
    return (
        <div className='footer'>
          <img className='logo' alt='' src={logo}/>
          <h1 className='h1_footer'></h1>
        </div>
    );
};

// Assurez-vous d'exporter le composant Main ici
export default Main; 
