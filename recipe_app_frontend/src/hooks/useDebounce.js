/**
 * PUBLIC_INTERFACE
 * useDebounce
 * Returns a debounced value that updates after the specified delay.
 * Useful for delaying heavy operations like API calls while typing.
 */
import { useEffect, useState } from 'react';

export default function useDebounce(value, delay = 400) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);

  return debounced;
}
