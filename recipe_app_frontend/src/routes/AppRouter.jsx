import React from 'react';
import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router-dom';

/**
 * Lightweight placeholder pages to wire up routing.
 * Replace these with real components in subsequent tasks.
 */
function HomePage() {
  return (
    <div className="container py-6">
      <h1 className="h1 mb-2">Recipe Explorer</h1>
      <p className="muted">Search and discover recipes with a modern Ocean Professional theme.</p>
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
