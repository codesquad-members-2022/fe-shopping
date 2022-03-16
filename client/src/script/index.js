const getAutoComplete = (keyword) => {
  return fetch(`/autoComplete?keyword=${keyword}`)
    .then((res) => res.json())
    .then((data) => data);
};

getAutoComplete('a').then(autoComplete => console.log(autoComplete));