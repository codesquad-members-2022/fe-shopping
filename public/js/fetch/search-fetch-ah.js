export async function fetchAutoCompleteDataAh() {
  const res = await fetch('/search/input/eeung/data');
  const data = await res.json();

  return data;
}
