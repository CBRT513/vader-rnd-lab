const KEY = 'vader_releases';
export function loadReleases(fallback) {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return fallback;
    const val = JSON.parse(raw);
    return Array.isArray(val) ? val : fallback;
  } catch {
    return fallback;
  }
}
export function saveReleases(rows) {
  try { localStorage.setItem(KEY, JSON.stringify(rows)); } catch {}
}
