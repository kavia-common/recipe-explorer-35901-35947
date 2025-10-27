import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import useRecipes from '../hooks/useRecipes';
import RecipeGrid from '../components/RecipeGrid';
import Loader from '../components/Loader';
import ErrorState from '../components/ErrorState';
import Filters from '../components/Filters';
import SearchBar from '../components/SearchBar';

/**
 * Home page: combines SearchBar, Filters, and RecipeGrid using useRecipes hook.
 * Syncs the text query with URL ?q param for shareable searches.
 */
function HomePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const qParam = params.get('q') || '';

  const {
    filters,
    items,
    loading,
    error,
    update,
    reset,
  } = useRecipes({ q: qParam });

  // Keep hook q in sync with URL changes
  useEffect(() => {
    if (qParam !== filters.q) {
      update({ q: qParam });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qParam]);

  function setQ(nextQ) {
    update({ q: nextQ });
    const p = new URLSearchParams(location.search);
    if (nextQ) p.set('q', nextQ);
    else p.delete('q');
    navigate({ pathname: '/', search: p.toString() ? `?${p.toString()}` : '' }, { replace: true });
  }

  return (
    <div className="container py-6">
      <h1 className="h1 mb-2">Recipe Explorer</h1>
      <p className="muted">Search and discover recipes with a modern Ocean Professional theme.</p>

      <div className="mt-3" style={{ display: 'grid', gap: 12 }}>
        <SearchBar
          value={filters.q}
          onChange={setQ}
          onSubmit={() => setQ(filters.q)}
        />

        <Filters
          value={{ cuisine: filters.cuisine, ingredients: filters.ingredients }}
          onChange={update}
          onReset={() => {
            reset();
            // clear q from URL too
            const p = new URLSearchParams(location.search);
            p.delete('q');
            navigate({ pathname: '/', search: p.toString() ? `?${p.toString()}` : '' }, { replace: true });
          }}
        />

        {loading && <Loader label="Fetching recipes…" />}

        {error && !loading && (
          <ErrorState
            message={error?.message || 'Unable to load recipes.'}
            onRetry={() => update({})}
          />
        )}

        {!loading && !error && <RecipeGrid items={items} />}
      </div>
    </div>
  );
}

function RecipeDetailPage() {
  const { id } = useParams();
  return (
    <div className="container py-6">
      <h1 className="h2">Recipe Details</h1>
      <p className="muted">Recipe ID: <strong>{id}</strong></p>
      <Link to="/" className="btn btn-secondary mt-3">Back to Home</Link>
    </div>
  );
}

function SignInPage() {
  return (
    <div className="container py-6">
      <h1 className="h2 mb-2">Sign In</h1>
      <p className="muted">Sign in UI will be integrated from provided assets.</p>
    </div>
  );
}

// PUBLIC_INTERFACE
export default function AppRouter() {
  /** Router for the application */
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recipe/:id" element={<RecipeDetailPage />} />
        <Route path="/signin" element={<SignInPage />} />
      </Routes>
    </BrowserRouter>
  );
}
