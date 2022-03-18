const request = (url) => {
  return fetch(url).then((res) => res.json());
};

export const getAutocompleteData = (url) => {
  return request(url)
    .then(data => data.suggestions.map(item => {return { item: item.value, link: '#' };}));
};
