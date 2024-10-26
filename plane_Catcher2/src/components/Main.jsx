import React from 'react';
import '../Main.css';
import image_header from '../assets/imgs/img_header.png';


const Main = () => {
    return (
        <main>
            <article className='article_flex'>
                <img className='' src={image_header} alt='Des'/>
                <div className='container_flex2'>
                  <h1 className='h1_article_flex' >EXPLORE THE WORLD</h1>
                  <h2 className='h2_article_flex'>Its time<br/> to travel around<br/> the World</h2>
                  <p  className='p_article_flex'>Check Off the Ultimate Global Travel Checklist With your<br/>
                                  Travel Partner! Make your vacation a fun, exciting, and<br/>
                                  unforgettable experience.</p>
                  <button className='button1'>Discover Now</button>
                </div>
            </article>
        </main>
    );
};

// Assurez-vous d'exporter le composant Main ici
export default Main; 
