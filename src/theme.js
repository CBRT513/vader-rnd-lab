const KEY = 'vader-theme'; // 'green' | 'amber'
export function getTheme() {
  return localStorage.getItem(KEY) || 'green';
}
export function applyTheme(t) {
  document.documentElement.setAttribute('data-theme', t);
  localStorage.setItem(KEY, t);
}
export function initTheme() {
  applyTheme(getTheme());
}
