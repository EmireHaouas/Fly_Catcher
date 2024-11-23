import React, { useState, useEffect } from 'react';
import './Darkmodetoggle.css';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Charger la préférence de thème depuis localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.body.classList.add('dark-mode');
    }
  }, []);

  // Fonction pour basculer entre le mode sombre et clair
  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => {
      const newMode = !prevMode;
      if (newMode) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
      } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
      }
      return newMode;
    });
  };

  return (
    <div>
      {/* Passer isDarkMode et toggleDarkMode en props à Header */}
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <Main />
      <Footer />
    </div>
  );
};

export default App;
