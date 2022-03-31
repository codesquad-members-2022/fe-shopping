export const debounce = (func, delay = 0) => {
  let timer;

  return function (...args) {
    clearTimeout(timer);

    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

export const fetchData = async (url) => {
  return await fetch(url).then((res) => res.json());
};

export const isEmpty = (target, key) => {
  if (key) {
    return target[key].length === 0;
  }
  return target.length === 0;
};
