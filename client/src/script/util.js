const delay = (data, time) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), time);
  });
};
const debounce = (function () {
  let timer;
  return function (callback, delay) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(callback, delay);
  };
})();

export { delay, debounce };