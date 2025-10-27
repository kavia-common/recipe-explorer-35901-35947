import React, { useState, useEffect } from 'react';
import SearchIcon from './SearchIcon';

/**
 * PUBLIC_INTERFACE
 * SearchBar
 * Controlled search input with submit and clear actions.
 * Props:
 *  - value: string
 *  - onChange: (value: string) => void
 *  - onSubmit: () => void
 *  - placeholder?: string
 */
export default function SearchBar({ value = '', onChange, onSubmit, placeholder = 'Search recipes...' }) {
  const [local, setLocal] = useState(value);

  useEffect(() => {
    setLocal(value);
  }, [value]);

  function submit(e) {
    e.preventDefault();
    onSubmit?.();
  }

  return (
    <form className="ocean-search" role="search" onSubmit={submit}>
      <label htmlFor="home-search" className="visually-hidden">Search recipes</label>
      <div className="input input--search">
        <SearchIcon aria-hidden="true" />
        <input
          id="home-search"
          type="search"
          value={local}
          onChange={(e) => {
            setLocal(e.target.value);
            onChange?.(e.target.value);
          }}
          placeholder={placeholder}
          aria-label="Search recipes"
        />
      </div>
      <button type="submit" className="btn btn-primary">Search</button>
    </form>
  );
}
