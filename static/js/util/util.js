export async function fetchData(dataName) {
  const DATA_URL = `http://localhost:3000/${dataName}`;
  const response = await fetch(DATA_URL);
  if (!response.ok) {
    return response.text().then(text => {throw new Error(text)});
  }
    return response.json();
}

export function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    const context = this;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(context, args), delay);
  }
}
