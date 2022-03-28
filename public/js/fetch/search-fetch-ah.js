export async function fetchAutoCompleteDataAh() {
  const res = await fetch('/search/ah/data');
  const data = await res.json();

  return data;
}
