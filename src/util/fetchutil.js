async function fetch_use(uri, callback) {
  const fetchedData = await fetch(uri);
  const jsonData = await fetchedData.json();
  return new callback(jsonData);
}

async function fetchData(uri) {
  const fetchedData = await fetch(uri);
  const jsonData = await fetchedData.json();
  return jsonData;
}

export { fetch_use, fetchData };
