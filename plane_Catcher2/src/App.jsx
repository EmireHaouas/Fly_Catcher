import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';

const App = () => {

  return (
    <div>
      {/* Passer isDarkMode et toggleDarkMode en props à Header */}
      <Header />
      <Main />
      <Footer />
    </div>
  );
};

export default App;
