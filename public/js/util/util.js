export const $ = (selector) => document.querySelector(selector);
export const $$ = (selector) => document.querySelectorAll(selector);

export const debounce = (func, delay = 0) => {
  let timer;

  return function () {
    clearTimeout(timer);
    timer = setTimeout(func, delay);
  };
};

export const fetchData = async (url) => {
  return await fetch(url).then((res) => res.json());
};

export const setDisplayBlock = (element) => {
  element.style.display = "block";
};

export const setDisplayNone = (element) => {
  element.style.display = "none";
};

export const isEmpty = (target) => {
  return target.length === 0;
};

export const sortAsc = (arr, key) => {
  if (key) {
    return arr.sort((a, b) => a[key] - b[key]);
  }
  return arr.sort((a, b) => a - b);
};

export const sortDesc = (arr, key) => {
  if (key) {
    return arr.sort((a, b) => b[key] - a[key]);
  }
  return arr.sort((a, b) => b - a);
};
