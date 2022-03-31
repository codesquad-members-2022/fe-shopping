export const $ = (selected) => document.body.querySelector(selected);

export const $$ = (selected) => document.body.querySelectorAll(selected);

export async function fetchData(url) {
  const successData = await fetch(url);
  const json = await successData.json();
  return json;
}

export async function getCompleteData(consonant) {
  const jsonData = await fetchData('/completeData');
  const completeData = jsonData[`${consonant}data`];
  return completeData;
}

export const throttle = (callback, wait) => {
  let waiting;
  return (event) => {
    if (waiting) return;
    waiting = setTimeout(() => {
      callback(event);
      waiting = null;
    }, wait);
  };
};

export const debounce = (callback, wait) => {
  let waiting;
  return (event) => {
    if (waiting) {
      clearTimeout(waiting);
    }
    waiting = setTimeout(callback, wait, event);
  };
};
