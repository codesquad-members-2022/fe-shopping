export function fetchData(dataName) {
  const DATA_URL = `http://localhost:3000/${dataName}`;
  return fetch(DATA_URL)
  .then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

export function debounce(func, delay) {
  let inDebounce;
  return function(...args) {
    const context = this;
    clearTimeout(inDebounce);
    inDebounce = setTimeout(() => func.apply(context, args), delay);
  }
}
