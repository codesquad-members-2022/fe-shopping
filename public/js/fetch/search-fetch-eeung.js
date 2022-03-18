export async function fetchAutoCompleteDataEeung() {
  const res = await fetch('http://localhost:3000/search/eeung/data');
  const data = await res.json();

  return data;
}
