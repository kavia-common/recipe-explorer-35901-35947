//
// API service layer for Recipe Explorer with mock toggling.
// Defaults to mock data via USE_MOCK=true; switch to real API by setting USE_MOCK=false
// and providing environment variables for base URL in .env (see comments below).
//

import { mockListRecipes, mockGetRecipeById } from './mockData';

// Toggle to use mock or real API. Keep default true for development until backend exists.
export const USE_MOCK = true;

// Base API URL; when integrating a real backend, set REACT_APP_API_BASE in .env
const API_BASE =
  (typeof process !== 'undefined' && process.env && process.env.REACT_APP_API_BASE) ||
  '/api';

// Helpers to build query strings
function buildQuery(params = {}) {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v === undefined || v === null) return;
    if (Array.isArray(v)) {
      if (v.length) qs.set(k, v.join(','));
    } else if (String(v).trim() !== '') {
      qs.set(k, v);
    }
  });
  return qs.toString();
}

/**
 * PUBLIC_INTERFACE
 * listRecipes
 * Fetch a paginated list of recipes with optional filters.
 * @param {Object} opts
 * @param {string} [opts.q] - free text search across name/description
 * @param {string} [opts.cuisine] - cuisine filter
 * @param {string[]} [opts.ingredients] - ingredients to include (any match)
 * @param {number} [opts.page=1] - page number (1-based)
 * @param {AbortSignal} [opts.signal] - optional abort signal for cancellation
 * @returns {Promise<{items: Array, page: number, pageSize: number, total: number}>>}
 */
export async function listRecipes({ q, cuisine, ingredients, page = 1, signal } = {}) {
  if (USE_MOCK) {
    // call mock implementation with the same signature
    return mockListRecipes({ q, cuisine, ingredients, page, signal });
  }

  const query = buildQuery({ q, cuisine, ingredients, page });
  const url = `${API_BASE}/recipes${query ? `?${query}` : ''}`;
  const res = await fetch(url, { signal });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Failed to load recipes: ${res.status} ${text}`);
  }
  return res.json();
}

/**
 * PUBLIC_INTERFACE
 * getRecipeById
 * Fetch a single recipe detail by ID.
 * @param {string|number} id - recipe identifier
 * @param {AbortSignal} [signal] - optional abort signal
 * @returns {Promise<Object>}
 */
export async function getRecipeById(id, signal) {
  if (USE_MOCK) {
    return mockGetRecipeById(id, signal);
  }

  const res = await fetch(`${API_BASE}/recipes/${id}`, { signal });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Failed to load recipe ${id}: ${res.status} ${text}`);
  }
  return res.json();
}
