export let abortController;

const request = (url) => {
    abortController = new AbortController();
    const { signal } = abortController.signal;
    return fetch(url, { signal }).then((res) => res.json())
};

export const getSuggestions = async (url) => {
  const { suggestions } = await request(url);
  if (abortController.signal.aborted) return null;
  else return suggestions.map(item => {return { item: item.value, link: '#' };});
};
