const getAutoComplete = (keyword) => {
  return fetch(`/autoComplete?keyword=${keyword}`)
    .then((res) => res.json())
    .then((data) => data);
};
const getCategories = async (type) => {
  const res = await fetch(`/category?type=${type}`);
  const data = res.json();
  return data;
}

export { getAutoComplete, getCategories };