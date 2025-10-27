import React from 'react';
import RecipeCard from './RecipeCard';

/**
 * PUBLIC_INTERFACE
 * RecipeGrid
 * Renders a responsive grid of RecipeCard items.
 * Props:
 *  - items: array of recipe objects
 *  - emptyMessage?: custom message when no items
 */
export default function RecipeGrid({ items = [], emptyMessage }) {
  if (!items || items.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-illustration" aria-hidden="true">🍳</div>
        <h2 className="h2">No recipes found</h2>
        <p className="muted">
          {emptyMessage || 'Try adjusting your search or filters to find delicious recipes.'}
        </p>
      </div>
    );
  }

  return (
    <div className="recipe-grid">
      {items.map((r) => (
        <RecipeCard key={r.id} recipe={r} />
      ))}
    </div>
  );
}
