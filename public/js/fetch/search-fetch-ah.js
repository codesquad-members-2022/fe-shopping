export async function fetchAutoCompleteDataAh() {
  const res = await fetch('/search/input/ah/data');
  const data = await res.json();

  return data;
}
