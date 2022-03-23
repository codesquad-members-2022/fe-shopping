export async function getData(...paths) {
  const resource = paths.join('/');
  const databaseURL = 'http://127.0.0.1:3000/';
  const res = await fetch(`${databaseURL}${resource}`);
  return await res.json();
}
