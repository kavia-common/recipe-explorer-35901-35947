import React from 'react';
import { Link } from 'react-router-dom';
import { formatMinutes } from '../utils/format';

/**
 * PUBLIC_INTERFACE
 * RecipeCard
 * Displays a single recipe in a card format with image, title, cuisine, cooking time and servings.
 * Wraps with a Link to detail page (/recipe/:id).
 * Props:
 *  - recipe: { id, name, cuisine, description, timeMinutes, servings, image }
 */
export default function RecipeCard({ recipe }) {
  if (!recipe) return null;
  const { id, name, cuisine, timeMinutes, servings, image, description } = recipe;

  return (
    <Link to={`/recipe/${id}`} className="card recipe-card" aria-label={`View details for ${name}`}>
      <div className="recipe-card__media">
        <img src={image} alt={name} loading="lazy" />
        <div className="recipe-card__badge" aria-hidden="true">{cuisine}</div>
      </div>
      <div className="recipe-card__body">
        <h3 className="recipe-card__title">{name}</h3>
        {description ? <p className="recipe-card__desc">{description}</p> : null}
        <div className="recipe-card__meta">
          <span className="meta-chip" title="Time">
            ⏱ {formatMinutes(timeMinutes)}
          </span>
          <span className="meta-chip" title="Servings">
            🍽 {servings}
          </span>
        </div>
      </div>
    </Link>
  );
}
