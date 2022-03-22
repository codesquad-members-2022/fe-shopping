async function fetch_use(uri, callback) {
  const fetchedData = await fetch(uri);
  const jsonData = await fetchedData.json();
  return new callback(jsonData);
}

function fetchData(uri) {
  return fetch(uri).then((data) => data.json);
}

export { fetch_use, fetchData };
