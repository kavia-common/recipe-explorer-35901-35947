import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Header.css';
import SearchIcon from './SearchIcon';

/**
 * PUBLIC_INTERFACE
 * Header component rendered globally across pages.
 * - Brand/title linking to Home
 * - Global search input: syncs with URL query (?q=) and navigates on submit
 * - Theme toggle: uses document.documentElement[data-theme] and persists in localStorage
 * - Sign In button: routes to /signin
 */
export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  // Search state derived from URL ?q= param
  const searchParams = new URLSearchParams(location.search);
  const initialQ = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQ);

  // Theme state synced with data-theme attribute on documentElement
  const [theme, setTheme] = useState(
    () => localStorage.getItem('theme') || document.documentElement.getAttribute('data-theme') || 'light'
  );

  useEffect(() => {
    // Keep query in sync when URL changes externally
    setQuery(initialQ);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('theme', theme);
    } catch {
      // ignore if storage not available
    }
  }, [theme]);

  function onSubmit(e) {
    e.preventDefault();
    const params = new URLSearchParams(location.search);
    if (query) {
      params.set('q', query);
    } else {
      params.delete('q');
    }
    navigate({ pathname: '/', search: params.toString() ? `?${params.toString()}` : '' }, { replace: location.pathname === '/' });
  }

  // PUBLIC_INTERFACE
  function toggleTheme() {
    setTheme((t) => (t === 'light' ? 'dark' : 'light'));
  }

  return (
    <header className="ocean-header" role="banner">
      <div className="container ocean-header__inner">
        <Link to="/" className="brand" aria-label="Recipe Explorer Home">
          <div className="brand-badge" aria-hidden="true">R</div>
          <span className="brand-title">Recipe Explorer</span>
        </Link>

        <form className="ocean-search" role="search" aria-label="Global" onSubmit={onSubmit}>
          <label htmlFor="global-search" className="visually-hidden">Search recipes</label>
          <div className="input input--search">
            <SearchIcon aria-hidden="true" />
            <input
              id="global-search"
              name="q"
              type="search"
              placeholder="Search recipes, ingredients, cuisine..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search recipes"
            />
          </div>
          <button type="submit" className="btn btn-primary ocean-search__submit" aria-label="Search">Search</button>
        </form>

        <nav aria-label="Header actions" className="ocean-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
          >
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>
          <Link to="/signin" className="btn btn-primary ocean-signin" aria-label="Go to Sign In page">
            Sign In
          </Link>
        </nav>
      </div>
    </header>
  );
}
