export async function fetchAutoCompleteDataEeung() {
  const res = await fetch('/search/input/ah/data');
  const data = await res.json();

  return data;
}
