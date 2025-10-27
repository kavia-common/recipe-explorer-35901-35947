import React from 'react';
import './App.css';
import './theme/theme.css';
import AppRouter from './routes/AppRouter';
import Header from './components/Header';

// PUBLIC_INTERFACE
function App() {
  /**
   * Root application component.
   * Renders global Header and page routes.
   */
  return (
    <div className="App">
      <Header />
      <main>
        <AppRouter />
      </main>
    </div>
  );
}

export default App;
