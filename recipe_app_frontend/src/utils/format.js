//
// Small utility helpers used across services/hooks.
//

// PUBLIC_INTERFACE
export function normalizeString(s) {
  return String(s || '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

// PUBLIC_INTERFACE
export function containsAny(haystackList, needles) {
  if (!Array.isArray(haystackList) || !Array.isArray(needles)) return false;
  const set = new Set(haystackList.map(normalizeString));
  return needles.some((n) => set.has(normalizeString(n)));
}

// PUBLIC_INTERFACE
export function formatMinutes(mins) {
  const m = Number(mins) || 0;
  if (m < 60) return `${m} min`;
  const h = Math.floor(m / 60);
  const r = m % 60;
  return r ? `${h}h ${r}m` : `${h}h`;
}
