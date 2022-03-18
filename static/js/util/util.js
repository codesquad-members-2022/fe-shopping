export async function fetchData(dataName) {
  const url = `http://localhost:3000/${dataName}`;
  const response = await fetch(url);
  const data = response.json();
  return data;
}

export function debounce(func, delay) {
  let inDebounce;
  return function(...args) {
    const context = this;
    clearTimeout(inDebounce);
    inDebounce = setTimeout(() => func.apply(context, args), delay);
  }
}
