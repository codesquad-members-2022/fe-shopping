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
