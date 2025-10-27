import React, { useMemo, useState } from 'react';
import { getAllCuisines, getAllIngredients } from '../services/mockData';

/**
 * PUBLIC_INTERFACE
 * Filters
 * Compact filter controls for cuisine (single select) and ingredients (multi-select via checkboxes).
 * Props:
 *  - value: { cuisine: string, ingredients: string[] }
 *  - onChange: (partial) => void
 *  - onReset?: () => void
 */
export default function Filters({ value = { cuisine: '', ingredients: [] }, onChange, onReset }) {
  const cuisines = useMemo(() => [''].concat(getAllCuisines()), []);
  const ingredients = useMemo(() => getAllIngredients(), []);
  const [open, setOpen] = useState(true);

  function toggle(i) {
    const set = new Set(value.ingredients || []);
    if (set.has(i)) set.delete(i);
    else set.add(i);
    onChange?.({ ingredients: Array.from(set) });
  }

  return (
    <section className="filters card">
      <header className="filters__header">
        <h3 className="h3">Filters</h3>
        <div className="filters__actions">
          {onReset && (
            <button type="button" className="btn btn-secondary" onClick={onReset}>Reset</button>
          )}
          <button
            type="button"
            className="btn"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="filters-body"
          >
            {open ? 'Hide' : 'Show'}
          </button>
        </div>
      </header>
      {open && (
        <div id="filters-body" className="filters__body">
          <div className="filter-row">
            <label htmlFor="cuisine" className="filter-label">Cuisine</label>
            <div className="input">
              <select
                id="cuisine"
                value={value.cuisine || ''}
                onChange={(e) => onChange?.({ cuisine: e.target.value })}
                aria-label="Cuisine filter"
              >
                {cuisines.map((c) => (
                  <option value={c} key={c || 'any'}>{c || 'Any'}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="filter-row">
            <span className="filter-label">Ingredients</span>
            <div className="ingredient-list">
              {ingredients.map((ing) => {
                const checked = (value.ingredients || []).includes(ing);
                return (
                  <label className={`chip ${checked ? 'chip--active' : ''}`} key={ing}>
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggle(ing)}
                      aria-label={`Include ${ing}`}
                    />
                    <span>{ing}</span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
