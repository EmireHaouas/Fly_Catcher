import React, { useState, useEffect } from "react";
import '../Darkmodetoggle.css';é

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Charger la préférence enregistrée depuis localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.body.classList.add("dark-mode");
    }
  }, []);

  // Basculer le mode sombre
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      if (newMode) {
        document.body.classList.add("dark-mode");
        localStorage.setItem("theme", "dark");
      } else {
        document.body.classList.remove("dark-mode");
        localStorage.setItem("theme", "light");
      }
      return newMode;
    });
  };

  // Rendre le JSX avec le toggle
  return (
    <div className="dark-mode-toggle">
      <label className="switch">
        <input
          type="checkbox"
          checked={isDarkMode}
          onChange={toggleDarkMode}
        />
        <span className="slider round">
          {isDarkMode ? (
            <i className="fas fa-moon"></i>
          ) : (
            <i className="fas fa-sun"></i>
          )}
        </span>
      </label>
    </div>
  );
};

export default DarkModeToggle;
