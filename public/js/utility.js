export function debounce(func, time) {
  let debounceTimer;

  if (debounceTimer) clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => func(), time);
}
