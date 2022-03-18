const getAutoComplete = (keyword) => {
  return fetch(`/autoComplete?keyword=${keyword}`)
    .then((res) => res.json())
    .then((data) => data);
};

export { getAutoComplete };