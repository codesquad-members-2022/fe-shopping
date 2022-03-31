async function fetch_use(uri, callback) {
  const fetchedData = await fetch(uri);
  const jsonData = await fetchedData.json();
  return new callback(jsonData);
}

async function fetchData(uri) {
  try {
    const data = await fetch(uri);
    const jsonData = await data.json();
    return jsonData;
  } catch (e) {
    console.error(`fetch에러 ${e.name} : ${e.message}`);
  }
}

export { fetch_use, fetchData };
