async function fetch_use(uri, callback) {
  const fetchedData = await fetch(uri);
  const jsonData = await fetchedData.json();
  return callback(jsonData);
}

export { fetch_use };
