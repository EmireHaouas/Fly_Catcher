import React, { useState } from 'react';
import Bottom_arrow_icon from '../assets/imgs/Bottom_arrow_icon.png';
import '../ToggleButton.css';

const ToggleButton = ({ onClick }) => {
  const [isBouncing, setIsBouncing] = useState(false);

  const handleClick = () => {
    // Démarre l'animation de rebond
    setIsBouncing(true);
    onClick();

    // Arrêter l'animation après un certain délai pour la rendre répétable
    setTimeout(() => setIsBouncing(false), 600); // 600ms correspond à la durée de l'animation
  };

  return (
    <img
      src={Bottom_arrow_icon}
      alt="Toggle geek infos"
      className={`bottom_arrow_icon ${isBouncing ? 'bounce' : ''}`}
      onClick={handleClick}
      style={{
        cursor: 'pointer',
        width: '40px',
        height: '40px',
        transition: 'transform 25.3s', // Vous pouvez ajuster la durée si nécessaire
      }}
    />
  );
};

export default ToggleButton;
