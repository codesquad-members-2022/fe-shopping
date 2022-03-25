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

export function throttle(callback, wait) {
  let waiting = true;
  return function (...args) {
    if (waiting) {
      callback(...args);
      waiting = false;
      setTimeout(() => {
        waiting = true;
      }, wait);
    }
  };
}

export function debounce(callback, wait) {
  let waiting;
  return function (...args) {
    clearTimeout(waiting);
    waiting = setTimeout(() => {
      callback(args);
    }, wait);
  };
}
