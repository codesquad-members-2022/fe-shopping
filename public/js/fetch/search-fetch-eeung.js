export async function fetchAutoCompleteDataEeung() {
  const res = await fetch('/search/eeung/data');
  const data = await res.json();

  return data;
}
