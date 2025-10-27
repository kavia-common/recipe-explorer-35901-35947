import React, { useState, useEffect } from 'react';
import './App.css';
import './theme/theme.css';
import AppRouter from './routes/AppRouter';

// PUBLIC_INTERFACE
function App() {
  /**
   * Root application component.
   * Manages light/dark theme via data-theme attribute and renders a minimal header + routes.
   */
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="App">
      <header className="header">
        <div className="container header-inner">
          <div className="brand">
            <div className="brand-badge" aria-hidden="true">R</div>
            <span>Recipe Explorer</span>
          </div>
          <nav aria-label="Global">
            <button
              className="btn btn-secondary"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
            >
              {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
            </button>
          </nav>
        </div>
      </header>

      <main>
        <AppRouter />
      </main>
    </div>
  );
}

export default App;
