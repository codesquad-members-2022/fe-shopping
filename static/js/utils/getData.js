export async function getData(URL, ...paths) {
  const resource = paths.join('/');
  const res = await fetch(`${URL}${resource}`);
  return await res.json();
}
