function fetch_use(uri, callback) {
  return fetch(uri)
    .then((data) => data.json())
    .then(callback);
}

export { fetch_use };
