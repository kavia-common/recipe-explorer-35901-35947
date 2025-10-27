/**
 * PUBLIC_INTERFACE
 * useRecipes
 * Manages recipe query state (q, cuisine, ingredients, page),
 * performs debounced searches with cancellation, and exposes loading/error/results.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import useDebounce from './useDebounce';
import { listRecipes } from '../services/api';

const DEFAULT_STATE = {
  q: '',
  cuisine: '',
  ingredients: [],
  page: 1,
};

export default function useRecipes(initial = {}) {
  const [filters, setFilters] = useState({ ...DEFAULT_STATE, ...initial });
  const [data, setData] = useState({ items: [], page: 1, pageSize: 0, total: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Debounce text query only; other filters trigger immediately but still benefit from abort.
  const debouncedQ = useDebounce(filters.q, 400);

  // Keep AbortController between renders to cancel in-flight requests.
  const abortRef = useRef(null);

  // Derived params to call API
  const params = useMemo(
    () => ({
      q: debouncedQ,
      cuisine: filters.cuisine || undefined,
      ingredients: Array.isArray(filters.ingredients) ? filters.ingredients : [],
      page: filters.page || 1,
    }),
    [debouncedQ, filters.cuisine, filters.ingredients, filters.page]
  );

  const runQuery = useCallback(async () => {
    // Cancel previous
    if (abortRef.current) {
      abortRef.current.abort();
    }
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setError(null);
    try {
      const res = await listRecipes({ ...params, signal: controller.signal });
      setData(res);
    } catch (err) {
      if (err?.name === 'AbortError') {
        // Silently ignore aborted requests
        return;
      }
      setError(err);
    } finally {
      // Only unset loading if current controller is ours (ignore race)
      if (abortRef.current === controller) {
        setLoading(false);
        abortRef.current = null;
      }
    }
  }, [params]);

  // Trigger fetch on params change
  useEffect(() => {
    runQuery();
    // Cleanup on unmount: abort in-flight
    return () => {
      if (abortRef.current) abortRef.current.abort();
    };
  }, [runQuery]);

  // PUBLIC_INTERFACE
  function update(partial) {
    setFilters((prev) => {
      const next = { ...prev, ...partial };
      // Reset to page 1 if any filter except page changes
      if (
        partial.q !== undefined ||
        partial.cuisine !== undefined ||
        partial.ingredients !== undefined
      ) {
        next.page = 1;
      }
      return next;
    });
  }

  // PUBLIC_INTERFACE
  function setPage(p) {
    setFilters((prev) => ({ ...prev, page: Math.max(1, Number(p) || 1) }));
  }

  // PUBLIC_INTERFACE
  function reset() {
    setFilters(DEFAULT_STATE);
  }

  return {
    filters,
    data,
    items: data.items,
    page: data.page,
    pageSize: data.pageSize,
    total: data.total,
    loading,
    error,
    update,
    setPage,
    reset,
  };
}
