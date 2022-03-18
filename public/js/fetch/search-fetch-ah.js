export async function fetchAutoCompleteDataAh() {
  const res = await fetch('http://localhost:3000/search/ah/data');
  const data = await res.json();

  return data;
}
